import { createSlice } from '@reduxjs/toolkit'
import { cartItem } from '../cart/cart'

type initialStateType = {
  order: OrderType | null
}

type OrderType = {
  orderItems: cartItem[]
  phone: string
  addressLine1: string
  addressLine2: string
  payment: string
  subtotal: number
  delivery: number
  total: number
}

const initialState: initialStateType = {
  order: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { zip, city, country, phone, street, apartment, payment } =
        action.payload

      const storedCart = localStorage.getItem('cart')
      const products: cartItem[] = storedCart ? JSON.parse(storedCart) : []
      let productsPrice = 0
      products.forEach((product) => {
        productsPrice += product.price * product.amount
      })
      const delivery = 15

      state.order = {
        orderItems: products,
        addressLine1: `${country}, ${zip}, ${city}`,
        addressLine2: `${street} ${apartment}`,
        phone: phone,
        payment: payment,
        subtotal: productsPrice,
        delivery: delivery,
        total: productsPrice + delivery,
      }
    },
  },
})

export const { placeOrder } = orderSlice.actions
export default orderSlice.reducer
