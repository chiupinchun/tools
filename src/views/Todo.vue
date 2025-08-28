<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable";
import {
  getTodos,
  addTodo,
  deleteTodo,
  clearDone,
  updateTodo,
  type Todo,
  type TodoStatus,
  type Priority,
  saveToStorage,
} from "@/api/modules/todo";
import TodoItem from "@/components/todo/TodoItem.vue";
import Typewriter from "@/components/ui/Typewriter.vue";
import { useFetch } from "@/api/core";

const statusList: TodoStatus[] = ["new", "doing", "done"];

interface GroupedTodos {
  new: Todo[];
  doing: Todo[];
  done: Todo[];
}

const { data: groupedTodos, refresh: refreshTodos } = useFetch<GroupedTodos>(
  () =>
    getTodos().then((data) => ({
      new: data.filter((t) => t.status === "new"),
      doing: data.filter((t) => t.status === "doing"),
      done: data.filter((t) => t.status === "done"),
    })),
  {
    defaultValue: {
      new: [],
      doing: [],
      done: [],
    },
  }
);

const isFormShow = ref(false);
const currentStatus = ref<TodoStatus>("new");

const form = ref({
  title: "",
  description: "",
  priority: "一般" as Priority,
});

const isEditing = ref(false);
const editingTodoId = ref<number | null>(null);

const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    priority: "一般",
  };
  isEditing.value = false;
  editingTodoId.value = null;
};

const handleDelete = async (id: number) => {
  await deleteTodo(id);
  refreshTodos();
};

const handleClearDone = async () => {
  await clearDone();
  refreshTodos();
};

const handleEdit = (todo: Todo) => {
  form.value = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
  };
  currentStatus.value = todo.status;
  editingTodoId.value = todo.id;
  isEditing.value = true;
  isFormShow.value = true;
};

const handleSubmit = async () => {
  const { title, description, priority } = form.value;
  if (!title.trim()) return;

  if (isEditing.value && editingTodoId.value !== null) {
    await updateTodo(editingTodoId.value, {
      title,
      description,
      priority,
    });
  } else {
    await addTodo(title, description, currentStatus.value, priority);
  }

  refreshTodos();
  resetForm();
  isFormShow.value = false;
};

const onDragEnd = () => {
  const newItems: Todo[] = groupedTodos.value.new.map((item) => ({
    ...item,
    status: "new",
  }));
  const doingItems: Todo[] = groupedTodos.value.doing.map((item) => ({
    ...item,
    status: "doing",
  }));
  const doneItems: Todo[] = groupedTodos.value.done.map((item) => ({
    ...item,
    status: "done",
  }));

  saveToStorage([...newItems, ...doingItems, ...doneItems]);
};
</script>

<template>
  <v-container>
    <div
      class="bg-gradient-to-r from-blue-600 to-primary rounded-lg p-6 mb-8 shadow text-white"
    >
      <h1 class="text-2xl font-bold tracking-wide">任務清單</h1>
      <p class="text-sm opacity-80 mt-1">
        <Typewriter text="管理、編輯、清單拖曳一次搞定" />
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div
        v-for="status in statusList"
        :key="status"
        class="bg-gray-100 dark:bg-neutral-800 p-4 rounded shadow-sm"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold flex items-center gap-2 capitalize">
            {{ status }}
          </h2>

          <v-btn
            v-if="status !== 'done'"
            prepend-icon="mdi-plus"
            color="primary"
            variant="flat"
            size="small"
            class="text-white text-xs"
            @click="
              () => {
                currentStatus = status;
                isFormShow = true;
                resetForm();
              }
            "
          >
            新增任務
          </v-btn>

          <v-btn
            v-if="status === 'done' && groupedTodos.done.length > 0"
            prepend-icon="mdi-delete"
            size="small"
            @click="handleClearDone"
            color="red"
            variant="flat"
            class="text-white"
          >
            清除全部
          </v-btn>
        </div>

        <draggable
          :list="groupedTodos[status]"
          group="tasks"
          itemKey="id"
          @end="onDragEnd"
          class="space-y-2"
        >
          <template #item="{ element }">
            <TodoItem
              :todo="element"
              @delete="handleDelete"
              @edit="handleEdit"
            />
          </template>
        </draggable>

        <div
          v-if="groupedTodos[status].length === 0"
          class="text-gray-400 text-sm italic py-4 text-center"
        >
          無任務
        </div>
      </div>
    </div>
  </v-container>

  <!-- 表單 Dialog -->
  <v-dialog v-model="isFormShow" max-width="500">
    <v-card>
      <v-card-title class="font-bold text-lg text-primary">
        <v-icon start icon="mdi-pencil" />
        {{ isEditing ? "編輯任務" : "新增任務" }}
      </v-card-title>
      <v-card-text class="space-y-4 pt-2">
        <v-text-field
          v-model="form.title"
          label="標題"
          variant="outlined"
          density="comfortable"
        />
        <v-textarea
          v-model="form.description"
          label="描述"
          variant="outlined"
          auto-grow
          density="comfortable"
        />
        <v-select
          v-model="form.priority"
          label="優先度"
          variant="outlined"
          :items="['一般', '優先', '緊急']"
          density="comfortable"
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="isFormShow = false">取消</v-btn>
        <v-btn color="primary" @click="handleSubmit">
          {{ isEditing ? "儲存變更" : "新增" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
