export type TodoStatus = "new" | "doing" | "done";
export type Priority = "一般" | "優先" | "緊急";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  priority: Priority;
}

export interface GroupedTodos {
  new: Todo[];
  doing: Todo[];
  done: Todo[];
}

const STORAGE_KEY = "todo";

function loadFromStorage(): Todo[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveToStorage(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export async function getTodos(): Promise<Todo[]> {
  return loadFromStorage();
}

export async function addTodo(
  title: string,
  description: string,
  status: TodoStatus,
  priority: Priority = "一般"
): Promise<Todo[]> {
  const todos = loadFromStorage();
  const newTodo: Todo = {
    id: Date.now(),
    title,
    description,
    status,
    priority,
  };
  todos.push(newTodo);
  saveToStorage(todos);
  return todos;
}

export async function deleteTodo(id: number): Promise<Todo[]> {
  const todos = loadFromStorage().filter((t) => t.id !== id);
  saveToStorage(todos);
  return todos;
}

export async function updateTodo(
  id: number,
  updatedFields: Partial<Pick<Todo, "title" | "description" | "priority">>
): Promise<Todo[]> {
  const todos = loadFromStorage().map((t) =>
    t.id === id ? { ...t, ...updatedFields } : t
  );
  saveToStorage(todos);
  return todos;
}

export async function clearDone(): Promise<Todo[]> {
  const todos = loadFromStorage().filter((t) => t.status !== "done");
  saveToStorage(todos);
  return todos;
}
