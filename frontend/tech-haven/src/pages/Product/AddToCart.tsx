import { useState } from 'react'
import { useDispatch } from 'react-redux'
import AmountButtons from '../../components/ui/AmountButtons'
import { addToCart } from '../../features/cart/cart'
import { ProductType } from '../../types'

type AddCoCartPropType = {
  product: ProductType
}

const AddToCart = ({ product }: AddCoCartPropType) => {
  const { countInStock: count, id: id } = product
  const dispatch = useDispatch()

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
        className="bg-[#405684] text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
        onClick={() => {
          dispatch(addToCart({ id, amount, product }))
        }}
      >
        Add To Cart
      </button>
    </div>
  )
}
export default AddToCart
