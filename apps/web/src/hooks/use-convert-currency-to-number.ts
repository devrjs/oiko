export function convertCurrencyToNumber(currency_str: string) {
  const numeric_str = currency_str.replace(/[R$\s]/g, '').replace(',', '.')
  const numeric_value = parseFloat(numeric_str)

  return numeric_value
}
