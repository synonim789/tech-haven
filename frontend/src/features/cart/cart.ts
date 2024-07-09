import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ProductType } from '../../types'

export type cartItem = {
  id: string
  amount: number
  price: number
  max: number
  image: string
  name: string
}

type CartState = {
  cart: cartItem[]
  totalPrice: number
  totalItems: number
}

const cartFromLocalStorage = localStorage.getItem('cart')
const cart =
  cartFromLocalStorage && typeof cartFromLocalStorage === 'string'
    ? JSON.parse(cartFromLocalStorage)
    : []

const initialState: CartState = {
  cart: cart,
  totalPrice: 0,
  totalItems: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: string
        amount: number
        product: ProductType
      }>
    ) => {
      const { id, amount, product } = action.payload
      if (state.cart) {
        const existingItem = state.cart.find((item: cartItem) => item.id === id)
        if (existingItem) {
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
          state.cart = tempCart
        } else {
          const newProduct = {
            id: id,
            name: product.name,
            image: product.image,
            price: product.price,
            max: product.countInStock,
            amount,
          }
          state.cart.push(newProduct)
        }
        cartSlice.caseReducers.countCartTotal(state)
        toast.info('Product Added to Cart')
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const newCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      )
      state.cart = newCart
      cartSlice.caseReducers.countCartTotal(state)
    },
    removeAllItemsFromCart: (state) => {
      state.cart = []
      state.totalItems = 0
      state.totalPrice = 0
      localStorage.setItem('cart', JSON.stringify([]))
    },
    countCartTotal: (state) => {
      const { totalPrice, totalItems } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem
          total.totalItems += amount
          total.totalPrice += price * amount
          return total
        },
        { totalItems: 0, totalPrice: 0 }
      )
      state.totalPrice = totalPrice
      state.totalItems = totalItems

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    changeAmount: (
      state,
      action: PayloadAction<{ id: string; value: 'increase' | 'decrease' }>
    ) => {
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
      state.cart = newCart
    },
  },
})

export const {
  addToCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  countCartTotal,
  changeAmount,
} = cartSlice.actions

export default cartSlice.reducer
