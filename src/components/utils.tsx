export function isEmptyString(value: string): value is string {
  return typeof value === 'string' && value.trim() === '';
}
