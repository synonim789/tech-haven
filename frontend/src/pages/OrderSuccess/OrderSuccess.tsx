import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { BsCheck } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useWindowSize } from 'react-use'
import { removeAllItemsFromCart } from '../../features/cart/cart'

const OrderSuccess = () => {
  const { width, height } = useWindowSize()
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.removeItem('cart')
    dispatch(removeAllItemsFromCart())
  }, [])

  return (
    <>
      <div className="z-[200]">
        <Confetti width={width} height={height} />
      </div>

      <main className="m-auto flex max-w-6xl flex-col items-center gap-7 p-5">
        <div className="flex items-center justify-center rounded-full bg-green-400 md:size-40">
          <BsCheck size={100} className="m-0 p-0 text-green-700" />
        </div>
        <h2 className="text-center text-3xl font-bold text-green-700">
          Your Order Is Confirmed
        </h2>
        <Link
          to="/"
          className="mt-5 rounded-lg bg-[#405684] px-4 py-2 text-2xl font-bold text-white shadow-lg"
        >
          Back To Home
        </Link>
      </main>
    </>
  )
}
export default OrderSuccess
