export const formatPrice = (price: number | undefined) => {
  console.log(price)
  if (price === undefined) {
    return 'Not Found'
  }
  const newPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)
  return newPrice
}
  