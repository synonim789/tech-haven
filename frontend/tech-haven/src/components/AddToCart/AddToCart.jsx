import { useState } from 'react'
import { useCartContext } from '../../context/cart_context'
import AmountButtons from '../AmountButtons/AmountButtons'
import './AddToCart.css'

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext()
  const { countInStock: count, id: id } = product

  const [amount, setAmount] = useState(1)
  const decrease = () => {
    setAmount((oldAmount) => {
      let newAmount = oldAmount - 1
      if (newAmount < 1) {
        newAmount = 1
      }
      return newAmount
    })
  }

  const increase = () => {
    setAmount((oldAmount) => {
      let newAmount = oldAmount + 1
      if (newAmount > count) {
        newAmount = count
      }
      return newAmount
    })
  }

  return (
    <div className="addtocart-container">
      <AmountButtons increase={increase} decrease={decrease} amount={amount} />
      <button
        className="addtocart-cta"
        onClick={() => {
          addToCart(id, amount, product)
        }}
      >
        Add To Cart
      </button>
    </div>
  )
}
export default AddToCart
