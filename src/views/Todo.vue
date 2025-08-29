<script setup lang="ts">
import { computed, ref } from "vue";
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
  type GroupedTodos,
} from "@/api/modules/todo";
import TodoItem from "@/components/todo/Item.vue";
import Typewriter from "@/components/ui/Typewriter.vue";
import { useFetch } from "@/api/core";
import TodoList from "@/components/todo/List.vue";

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
const editingTodoId = ref<number | null>(null);
const isEditing = computed(() => editingTodoId.value !== null);

const form = ref({
  title: "",
  description: "",
  priority: "一般" as Priority,
});

const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    priority: "一般",
  };
  editingTodoId.value = null;
};

const onAddItem = (status: TodoStatus) => {
  currentStatus.value = status;
  isFormShow.value = true;
  resetForm();
};

const onEditItem = (todo: Todo) => {
  form.value = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
  };
  currentStatus.value = todo.status;
  editingTodoId.value = todo.id;
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

const onDeleteItem = async (id: number) => {
  await deleteTodo(id);
  refreshTodos();
};

const onClearDone = async () => {
  await clearDone();
  refreshTodos();
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
  <div
    class="bg-gradient-to-r from-blue-600 to-primary rounded-lg p-6 mb-8 shadow text-white"
  >
    <h1 class="text-2xl font-bold tracking-wide">任務清單</h1>
    <p class="text-sm opacity-80 mt-1">
      <Typewriter text="管理、編輯、清單拖曳一次搞定" />
    </p>
  </div>

  <TodoList
    :data="groupedTodos"
    @add="onAddItem"
    @clear-done="onClearDone"
    @drag-end="onDragEnd"
  >
    <template #item="{ todoItem }">
      <TodoItem :todo="todoItem" @delete="onDeleteItem" @edit="onEditItem" />
    </template>
  </TodoList>

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
