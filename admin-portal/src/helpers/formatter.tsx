export function formatMoney(number: number) {
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatNumber(number: number) {
  return number.toLocaleString("en-US");
}

export function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
