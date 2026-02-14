export function pluralize(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n)
  const lastDigit = abs % 10
  const lastTwo = abs % 100

  if (n === 1) return `${n} ${one}`
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${n} ${few}`
  return `${n} ${many}`
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
