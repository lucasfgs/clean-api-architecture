export const isBoolean = (value: unknown): value is boolean => {
  if (typeof value === 'boolean') return true
  return false
}
