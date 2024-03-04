export const formatPrice = (price: number) => {
  if (!price) {
    return 'Not Found'
  }
  const newPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)
  return newPrice
}
