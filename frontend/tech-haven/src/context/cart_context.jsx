import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import cartReducer from '../reducer/cartReducer'

const CartContext = createContext()

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_amount: 0,
  total_items: 0,
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (id, amount, product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, amount, product } })
    toast.info('Product Added to Cart')
  }

  const removeFromCart = (id) => {
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

  const changeAmount = (id, value) => {
    dispatch({ type: 'CHANGE_AMOUNT', payload: { id, value } })
  }

  useEffect(() => {
    countCartTotal()
    addToLocalStorage()
  }, [state.cart])
  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        removeAllItemsFromCart,
        changeAmount,
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
