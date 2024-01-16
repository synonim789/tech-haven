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

      <main className="m-auto max-w-6xl p-5 flex flex-col items-center gap-7">
        <div className="md:w-40 md:h-40 bg-green-400 rounded-full flex items-center justify-center">
          <BsCheck size={100} className="text-green-700 p-0 m-0" />
        </div>
        <h2 className="text-3xl font-bold text-center text-green-700">
          Your Order Is Confirmed
        </h2>
        <Link
          to="/"
          className="bg-[#120b90] text-white px-4 py-2 rounded-lg shadow-lg text-2xl font-bold mt-5"
        >
          Back To Home
        </Link>
      </main>
    </>
  )
}
export default OrderSuccess
