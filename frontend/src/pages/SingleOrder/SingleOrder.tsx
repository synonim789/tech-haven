import { useParams } from 'react-router'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetSingleOrderQuery } from '../../features/orders/ordersApiSlice'
import { formatPrice } from '../../utils/formatPrice'
import SingleOrderProduct from './SingleOrderProduct'

const SingleOrder = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSingleOrderQuery(id)

  if (isLoading) {
    return <FullscreenLoading />
  }

  if (!data) {
    return null
  }

  return (
    <section className="w-full">
      <div className="flex flex-col gap-5">
        <div className="hidden font-semibold text-slate-400 md:grid md:grid-cols-4">
          <p className="col-span-2 text-right">Product</p>
          <p className="col-span-1 text-right">Quantity</p>
          <p className="col-span-1 text-right">Price</p>
        </div>
        {data?.orderItems.map((item) => {
          return (
            <SingleOrderProduct
              image={item.productId.image}
              name={item.productId.name}
              price={item.productId.price}
              quantity={item.quantity}
              id={item.productId._id}
              key={item.productId._id}
            />
          )
        })}
        <div className="flex justify-end dark:text-slate-400">
          <div className="flex w-fit flex-col gap-2 text-right">
            <p className="text-xl">
              Subtotal:{' '}
              <span className="font-bold">{formatPrice(data?.subtotal)}</span>
            </p>
            <p className="text-xl">
              Delivery: <span className="font-bold">{formatPrice(1500)}</span>
            </p>
            <div className="h-[2px] bg-gray-600" />
            <p className="text-xl">
              Total:{' '}
              <span className="font-bold">{formatPrice(data?.total)}</span>
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-white p-3 text-xl font-semibold text-slate-400 shadow-md dark:bg-[#121212]">
          <p>Address:</p>
          <p>{data?.shippingAddress1}</p>
          <p>{data?.shippingAddress2}</p>
        </div>
      </div>
    </section>
  )
}
export default SingleOrder
