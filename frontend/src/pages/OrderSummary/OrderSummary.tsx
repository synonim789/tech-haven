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
  const [addStripeOrder, { isLoading: addStripeOrderIsLoading }] =
    usePostOrderStripeMutation()

  if (!order) {
    return (
      <h4 className="m-auto max-w-6xl p-5 text-center text-5xl font-bold text-slate-500">
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
        .catch((error) => toast.error(error.message))
    } else if (order.payment === 'Cash On Delivery') {
      await addOrder({
        products: orderItems,
        userId: user,
        shippingAddress1: order.addressLine1,
        shippingAddress2: order.addressLine2,
        phone: order.phone,
        total: order.total,
        subtotal: order.subtotal,
      })
        .unwrap()
        .then(() => toast.success('success'))
        .catch((error) => toast.error(error.message))
    }
  }

  if (addOrderIsSuccess) {
    return <Navigate to="/order-success" />
  }

  return (
    <section className="mx-auto w-full max-w-6xl p-5 text-3xl">
      <h2 className="mb-5 text-center text-5xl font-bold text-slate-500">
        Order Summary
      </h2>
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="flex basis-3/4 flex-col gap-y-5">
          {order?.orderItems.map((item) => {
            return <OrderSummaryProduct product={item} key={item.id} />
          })}
        </div>
        <div className="flex w-full basis-1/4 flex-col items-center justify-around gap-4 rounded-lg bg-white px-4 text-slate-600 shadow-md dark:bg-[#121212]">
          <p className="my-4 flex gap-1">
            <span className="font-bold">Subtotal: </span>
            {formatPrice(order.subtotal)}
          </p>
          <p className="my-4 flex gap-1">
            <span className="font-bold">Shipping: </span>
            {formatPrice(order.delivery)}
          </p>
          <div className="h-1 w-full rounded-full bg-gray-500" />
          <p className="my-4 flex gap-1">
            <b>Total: </b>
            {formatPrice(order.total)}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex flex-col items-center justify-between gap-5 rounded-lg bg-white p-5 text-slate-600 shadow-md md:flex-row dark:bg-[#121212]">
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
            className="mt-5 rounded-lg bg-[#405684] px-4 py-2 text-2xl font-bold text-white shadow-lg transition hover:scale-105 hover:opacity-75"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  )
}
export default OrderSummary
