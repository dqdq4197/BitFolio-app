export default function krwFormat(num?: number): string {
  if (!num) return '0'
  return num.toLocaleString('en')
}
