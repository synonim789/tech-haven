import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import cartReducer from '../reducer/cartReducer'
import { ChildrenType, ProductType } from '../types'

export type CartItemType = {
  id: string
  name: string
  image: string
  price: number
  max: number
  amount: number
}

type CartContextType = {
  addToCart: (id: string, amount: number, product: ProductType) => void
  removeFromCart: (id: string) => void
  removeAllItemsFromCart: () => void
  changeAmount: (id: string, value: string) => void
  total_items: number
  cart: CartItemType[]
  total_amount: number
}

const CartContext = createContext<CartContextType | null>(null)

const initialState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')!)
    : null,
  total_amount: 0,
  total_items: 0,
}

export const CartProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (id: string, amount: number, product: ProductType) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, amount, product } })
    toast.info('Product Added to Cart')
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: id })
    toast.info('Product Removed From Cart')
  }

  const removeAllItemsFromCart = () => {
    dispatch({ type: 'REMOVE_ALL_ITEMS_FROM_CART' })
  }

  const countCartTotal = () => {
    dispatch({ type: 'COUNT_CART_TOTAL' })
  }

  const addToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }

  const changeAmount = (id: string, value: string) => {
    dispatch({ type: 'CHANGE_AMOUNT', payload: { id, value } })
  }

  useEffect(() => {
    countCartTotal()
    addToLocalStorage()
  }, [state.cart])
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        removeAllItemsFromCart,
        changeAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
