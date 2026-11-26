const rubleFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

export function formatCurrency(amount: number): string {
  return rubleFormatter.format(amount);
}
