export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "note";

function loadFromStorage(): Note[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveToStorage(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export async function getNotes(): Promise<Note[]> {
  return loadFromStorage();
}

export function getNoteById(id: number): Promise<Note | null> {
  const targetNote = loadFromStorage().find((note) => note.id === id);
  return Promise.resolve(targetNote ?? null);
}

export async function addNote(
  fields: Pick<Note, "title" | "content" | "tags">
): Promise<Note> {
  const { title, content, tags } = fields;
  const notes = loadFromStorage();
  const now = Date.now();
  const newNote: Note = {
    id: now,
    title,
    content,
    tags,
    createdAt: now,
    updatedAt: now,
  };
  notes.push(newNote);
  saveToStorage(notes);
  return newNote;
}

export async function updateNote(
  id: number,
  updatedFields: Partial<Pick<Note, "title" | "content" | "tags">>
): Promise<Note[]> {
  const notes = loadFromStorage().map((n) =>
    n.id === id ? { ...n, ...updatedFields, updatedAt: Date.now() } : n
  );
  saveToStorage(notes);
  return notes;
}

export async function deleteNote(id: number): Promise<Note[]> {
  const notes = loadFromStorage().filter((n) => n.id !== id);
  saveToStorage(notes);
  return notes;
}
