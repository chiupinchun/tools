export const deepClone = <T>(input: T): T => {
  // 處理 Date
  if (input instanceof Date) {
    return new Date(input.getTime()) as T
  }

  // 處理 RegExp
  if (input instanceof RegExp) {
    return new RegExp(input.source, input.flags) as T
  }

  // 處理 Array
  if (Array.isArray(input)) {
    return input.map((item) => deepClone(item)) as T
  }

  // 處理物件（非函數且非特殊物件）
  if (input && typeof input === 'object') {
    const prototype = Object.getPrototypeOf(input)
    const clonedObj = Object.create(prototype)
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        clonedObj[key] = deepClone(input[key])
      }
    }
    return clonedObj as T
  }

  return input
}
