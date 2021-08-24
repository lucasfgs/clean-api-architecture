export function isAPositiveNumber (value: string | number): boolean {
  if (Number.isNaN(+value)) {
    return false
  }

  if (+value < 0) {
    return false
  }

  return true
}
