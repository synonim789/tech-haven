import { useParams } from 'react-router'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetSingleOrderQuery } from '../../features/orders/ordersApiSlice'
import SingleOrderProduct from './SingleOrderProduct'

const SingleOrder = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSingleOrderQuery(id)

  console.log(data)

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <section>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-4 font-semibold">
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
              id={item.productId.id}
              key={item.productId._id}
            />
          )
        })}
        <div className="flex justify-end">
          <div className="flex flex-col gap-2 w-fit text-right">
            <p className="text-xl">
              Subtotal: <span className="font-bold">${data?.subtotal}</span>
            </p>
            <p className="text-xl">
              Delivery: <span className="font-bold">$15</span>
            </p>
            <div className="bg-gray-600 h-[2px] w" />
            <p className="text-xl">
              Total: <span className="font-bold">${data?.total}</span>
            </p>
          </div>
        </div>
        <div className="bg-white font-semibold text-xl rounded-lg shadow-md p-3">
          <p>Address:</p>
          <p>{data?.shippingAddress1}</p>
          <p>{data?.shippingAddress2}</p>
        </div>
      </div>
    </section>
  )
}
export default SingleOrder
