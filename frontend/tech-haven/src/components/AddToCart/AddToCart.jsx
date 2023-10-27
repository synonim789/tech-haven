import { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './AddToCart.css'

const AddToCart = ({ product }) => {
  const { countInStock: count } = product

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
      <div className="addtocart-container__amount">
        <button className="addtocart-decrease" onClick={() => decrease()}>
          <MdKeyboardArrowDown />
        </button>
        <p className="addtocart-number">{amount}</p>
        <button className="addtocart-increase" onClick={() => increase()}>
          <MdKeyboardArrowUp />
        </button>
      </div>
      <Link to="/cart" className="addtocart-cta">
        Add To Cart
      </Link>
    </div>
  )
}
export default AddToCart
