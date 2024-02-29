import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { toast } from 'react-toastify'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import {
  usePostOrderMutation,
  usePostOrderStripeMutation,
} from '../../features/orders/ordersApiSlice'
import { RootState } from '../../store'
import { formatPrice } from '../../utils/formatPrice'
import OrderSummaryProduct from './OrderSummaryProduct'

type OrderedItems = {
  quantity: number
  price: number
  name: string
  productId: string
}

const OrderSummary = () => {
  const order = useSelector((state: RootState) => state.order.order)
  const user = useSelector((state: RootState) => state.user.user?._id)
  const [orderItems, setOrderItems] = useState<OrderedItems[]>([])
  const [
    addOrder,
    { isLoading: addOrderIsLoading, isSuccess: addOrderIsSuccess },
  ] = usePostOrderMutation()
  const [
    addStripeOrder,
    { isLoading: addStripeOrderIsLoading, isSuccess: addStripeOrderIsSuccess },
  ] = usePostOrderStripeMutation()

  if (!order) {
    return (
      <h4 className="text-center text-5xl font-bold max-w-6xl mx-auto px-5 my-auto py-5 text-slate-500">
        You need to place an order to get to summary.
      </h4>
    )
  }

  useEffect(() => {
    const orderedItems = order.orderItems.map((orderItem) => {
      return {
        quantity: orderItem.amount,
        price: orderItem.price,
        name: orderItem.name,
        productId: orderItem.id,
      }
    })
    setOrderItems(orderedItems)
  }, [order])

  if (addOrderIsLoading || addStripeOrderIsLoading) {
    return <FullscreenLoading />
  }

  const handleCheckout = async () => {
    if (order.payment === 'stripe') {
      await addStripeOrder({
        products: orderItems,
        userId: user,
        shippingAddress1: order.addressLine1,
        shippingAddress2: order.addressLine2,
        phone: order.phone,
      })
        .unwrap()
        .then((data) => (window.location.href = data.url))
        .catch((error: any) => console.log(error))
    } else if (order.payment === 'Cash On Delivery') {
      try {
        await addOrder({
          products: orderItems,
          userId: user,
          shippingAddress1: order.addressLine1,
          shippingAddress2: order.addressLine2,
          phone: order.phone,
          total: order.total,
          subtotal: order.subtotal,
        })
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  }

  if (addOrderIsSuccess) {
    return <Navigate to="/order-success" />
  }

  return (
    <section className="text-3xl py-5 max-w-6xl mx-auto w-full px-5">
      <h2 className="text-5xl font-bold mb-5 text-center text-slate-500">
        Order Summary
      </h2>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="flex flex-col gap-y-5 basis-3/4">
          {order?.orderItems.map((item) => {
            return <OrderSummaryProduct product={item} key={item.id} />
          })}
        </div>
        <div className="bg-white px-4 w-full basis-1/4 shadow-md rounded-lg flex flex-col gap-4 items-center justify-around text-slate-600 dark:bg-[#121212]">
          <p className="flex gap-1 my-4">
            <span className="font-bold">Subtotal: </span>
            {formatPrice(order.subtotal)}
          </p>
          <p className="flex gap-1 my-4">
            <span className="font-bold">Shipping: </span>
            {formatPrice(order.delivery)}
          </p>
          <div className="w-full bg-gray-500 h-1 rounded-full" />
          <p className="flex gap-1 my-4">
            <b>Total: </b>
            {formatPrice(order.total)}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="bg-white rounded-lg shadow-md p-5 flex justify-between items-center text-slate-600 dark:bg-[#121212]">
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
            className="bg-[#405684] text-white px-4 py-2 rounded-lg shadow-lg text-2xl font-bold mt-5 hover:scale-105 hover:opacity-75 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  )
}
export default OrderSummary
