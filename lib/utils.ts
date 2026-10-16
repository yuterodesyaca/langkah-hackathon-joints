export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function percentChange(current: number, previous: number) {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
}
