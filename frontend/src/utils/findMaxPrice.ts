import { ProductType } from '../types'

export const findMaxPrice = (products: ProductType[]) => {
  if (products.length === 0) {
    return 0
  }

  let maxPrice = products[0].price

  for (let i = 1; i < products.length; i++) {
    if (products[i].price > maxPrice) {
      maxPrice = products[i].price
    }
  }
  return maxPrice
}
