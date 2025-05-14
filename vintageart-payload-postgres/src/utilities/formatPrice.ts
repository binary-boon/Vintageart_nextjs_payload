/**
 * Format a price with currency symbol
 */
export const formatPrice = (price: number | string, currency = 'USD'): string => {
  if (typeof price === 'string') {
    price = parseFloat(price)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price)
}
