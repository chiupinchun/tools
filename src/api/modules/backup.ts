import { getNotes } from "./note"
import { getTodos } from "./todo"

const exportSchema = {
  note: getNotes,
  todo: getTodos
}

type SchemaKeys = keyof typeof exportSchema

type ExportData = {
  [K in SchemaKeys]: Awaited<ReturnType<typeof exportSchema[K]>>
}

export const load = async () => {
  const data: Record<string, ExportData[keyof ExportData]> = {}

  const getters: (() => Promise<void>)[] = []

  Object.entries(exportSchema).forEach(([key, getter]) => {
    getters.push(async () => {
      data[key] = await getter()
    })
  })

  await Promise.all(getters.map(getter => getter()))

  return data as ExportData
}

export const save = (data: Record<SchemaKeys, string>) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value))
  })
}
