export function formatCurrency(
  amount: string,
  locale: string = "en-US",
  currency: string = "USD",
): string {
  const numberAmount = Number(amount);

  return numberAmount.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
