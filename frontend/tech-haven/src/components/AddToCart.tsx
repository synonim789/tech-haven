import { useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { ProductType } from '../types'
import AmountButtons from './AmountButtons'

type AddCoCartPropType = {
  product: ProductType
}

const AddToCart = ({ product }: AddCoCartPropType) => {
  const { addToCart } = useCartContext()!
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
    <div className="flex justify-end gap-20">
      <AmountButtons increase={increase} decrease={decrease} amount={amount} />
      <button
        className="p-3 bg-[#120b90] text-white font-bold text-[20px] rounded-xl hover:opacity-75"
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
