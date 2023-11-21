const cartReducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    const { id, amount, product } = action.payload
    const tempItem = state.cart.find((item) => item.id === id)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newProduct = {
        id: id,
        name: product.name,
        image: product.image,
        price: product.price,
        max: product.countInStock,
        amount,
      }
      return { ...state, cart: [...state.cart, newProduct] }
    }
  }

  if (action.type === 'REMOVE_ITEM_FROM_CART') {
    const newCart = state.cart.filter((item) => item.id !== action.payload)

    return { ...state, cart: newCart }
  }

  if (action.type === 'REMOVE_ALL_ITEMS_FROM_CART') {
    return { ...state, cart: null }
  }

  if (action.type === 'COUNT_CART_TOTAL') {
    const { total_amount, total_items } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem
        total.total_items += amount
        total.total_amount += price * amount
        return total
      },
      { total_amount: 0, total_items: 0 }
    )
    return { ...state, total_amount, total_items }
  }

  if (action.type === 'CHANGE_AMOUNT') {
    const { id, value } = action.payload
    const newCart = state.cart.map((cartItem) => {
      if (cartItem.id === id) {
        if (value === 'increase') {
          let newAmount = cartItem.amount + 1
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        }

        if (value === 'decrease') {
          let newAmount = cartItem.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...cartItem, amount: newAmount }
        }
      }
      return cartItem
    })
    return { ...state, cart: newCart }
  }
}
export default cartReducer
