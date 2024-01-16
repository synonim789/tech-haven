import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState } from '../../store'
import OrderSummaryProduct from './OrderSummaryProduct'

type OrderedItems = {
  quantity: number
  price: number
  name: string
  id: string
}

const OrderSummary = () => {
  const order = useSelector((state: RootState) => state.order.order)
  const user = useSelector((state: RootState) => state.user.user?._id)
  const [orderItems, setOrderItems] = useState<OrderedItems[] | undefined>([])

  useEffect(() => {
    const orderedItems = order?.orderItems.map((orderItem) => {
      return {
        quantity: orderItem.amount,
        price: orderItem.price,
        name: orderItem.name,
        id: orderItem.id,
      }
    })
    setOrderItems(orderedItems)
  }, [order])

  if (!order) {
    return (
      <h4 className="text-center text-5xl font-bold max-w-6xl mx-auto px-5 my-auto py-5">
        You need to place an order to get to summary.
      </h4>
    )
  }

  const handleCheckout = () => {
    axios
      .post('http://localhost:3000/api/v1/stripe/create-checkout-session', {
        products: orderItems,
        userId: user,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url
        }
      })
      .catch((err) => toast.error(err.message))
  }

  return (
    <section className="text-3xl py-5 max-w-6xl mx-auto w-full px-5">
      <h2 className="text-5xl font-bold mb-5 text-center">Order Summary</h2>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="flex flex-col gap-y-5 basis-3/4">
          {order?.orderItems.map((item) => {
            return <OrderSummaryProduct product={item} />
          })}
        </div>
        <div className="bg-white px-4 w-full basis-1/4 shadow-md rounded-lg flex flex-col gap-4 items-center justify-around">
          <p className="flex gap-1 my-4">
            <span className="font-bold">Subtotal: </span>${order.productsPrice}
          </p>
          <p className="flex gap-1 my-4">
            <span className="font-bold">Shipping: </span>${order.delivery}
          </p>
          <div className="w-full bg-gray-500 h-1 rounded-full" />
          <p className="flex gap-1 my-4">
            <b>Total: </b>${order.fullPrice}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="bg-white rounded-lg shadow-md p-5 flex justify-between items-center">
          <div>
            <p className="capitalize">
              <b>Payment method:</b> {order.payment}
            </p>
            <p>
              <b>Phone:</b> {order.phone}
            </p>
            <p>{order.addressLine1}</p>
            <p>{order.addressLine2}</p>
          </div>
          <button
            onClick={() => handleCheckout()}
            className="text-white bg-[#120b90] py-1 px-2 block w-fit font-bold"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  )
}
export default OrderSummary
