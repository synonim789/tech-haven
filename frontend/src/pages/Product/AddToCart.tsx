import { useState } from 'react'
import { useDispatch } from 'react-redux'
import AmountButtons from '../../components/ui/AmountButtons'
import { addToCart } from '../../features/cart/cart'
import { ProductType } from '../../types'

type Props = {
  product: ProductType
}

const AddToCart = ({ product }: Props) => {
  const { countInStock: count, _id: id } = product
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
    <div className="flex items-center justify-between gap-10 md:gap-20">
      <AmountButtons increase={increase} decrease={decrease} amount={amount} />
      <button
        className="rounded-lg bg-[#405684] px-2 py-4 text-[20px] font-bold text-white transition hover:scale-105 hover:opacity-80 md:text-[24px]"
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
