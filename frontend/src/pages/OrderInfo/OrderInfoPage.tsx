import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaStripeS } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import { placeOrder } from '../../features/orders/ordersSlice'
import { RootState } from '../../store'
import { orderInfoSchema, OrderInfoValues } from '../../validation/order'

const OrderInfoPage = () => {
  const user = useSelector((state: RootState) => state.user.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrderInfoValues>({
    resolver: zodResolver(orderInfoSchema),
    defaultValues: {
      name: user?.name,
      apartment: user?.apartment,
      city: user?.city,
      country: user?.country,
      payment: 'stripe',
      phone: user?.phone,
      street: user?.street,
    },
  })

  const submitHandler = (data: OrderInfoValues) => {
    navigate('/order/summary')
    dispatch(placeOrder(data))
  }

  return (
    <section className="my-10 max-w-6xl md:mx-auto">
      <div className="w-full rounded-xl bg-white p-5 shadow-xl dark:bg-[#121212]">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col md:grid md:grid-cols-2 md:gap-x-6 space-y-6"
        >
          <h4 className="mb-4 text-3xl font-bold text-slate-500">
            Delivery Info:
          </h4>
          <div className="md:col-span-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              {...register('name')}
              error={errors?.name?.message}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-red-400">{message}</p>
              )}
            />
          </div>
          <div>
            <Label htmlFor="zip">Zip</Label>
            <Input
              id="zip"
              type="text"
              placeholder="Zip-Code"
              {...register('zip')}
              error={errors?.zip?.message}
            />
            <ErrorMessage
              errors={errors}
              name="zip"
              render={({ message }) => (
                <p className="text-red-400">{message}</p>
              )}
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              placeholder="City"
              {...register('city')}
              error={errors?.city?.message}
            />
            <ErrorMessage
              errors={errors}
              name="city"
              render={({ message }) => (
                <p className="text-red-400">{message}</p>
              )}
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              placeholder="Country"
              {...register('country')}
              error={errors?.country?.message}
            />
            <ErrorMessage
              errors={errors}
              name="country"
              render={({ message }) => (
                <p className="text-red-400">{message}</p>
              )}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Phone Number"
              type="text"
              {...register('phone')}
              error={errors?.phone?.message}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => (
                <p className="text-red-400">{message}</p>
              )}
            />
          </div>
          <div>
            <Label htmlFor="street">Street</Label>
            <Input
              type="text"
              id="street"
              placeholder="Street"
              {...register('street')}
              error={errors?.street?.message}
            />
            <ErrorMessage
              errors={errors}
              name="street"
              render={({ message }) => (
                <p className="text-red-400">{message}</p>
              )}
            />
          </div>
          <div>
            <Label htmlFor="apartment">Apartment</Label>
            <Input
              type="text"
              id="apartment"
              placeholder="Apartment"
              {...register('apartment')}
              error={errors?.apartment?.message}
            />
            <ErrorMessage
              errors={errors}
              name="apartment"
              render={({ message }) => (
                <p className="text-red-400">{message}</p>
              )}
            />
          </div>

          <h4 className="col-span-2 mt-4 text-3xl font-bold text-slate-500">
            Payment method:
          </h4>
          <div className="mt-4 flex flex-col justify-between gap-4 md:col-span-2 md:flex-row">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex items-center text-2xl">
                <label
                  htmlFor="stripe"
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                >
                  <input
                    type="radio"
                    value="stripe"
                    id="stripe"
                    {...register('payment', {
                      required: 'Payment form is required',
                    })}
                    className="peer relative size-5 cursor-pointer appearance-none rounded-full border border-gray-100/10 bg-gray-300/5 p-0 text-gray-900 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:size-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-gray-300 before:opacity-0 before:transition-opacity before:content-[''] checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                  />
                  <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-slate-400 opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-full scale-105"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>

                <FaStripeS className="dark:text-slate-500" />
                <Label htmlFor="stripe">Stripe</Label>
              </div>
              <div className="flex items-center text-2xl">
                <label
                  className=" relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="cod"
                >
                  <input
                    type="radio"
                    value="Cash On Delivery"
                    id="cod"
                    {...register('payment', {
                      required: 'Payment form is required',
                    })}
                    className="peer relative size-5 cursor-pointer appearance-none rounded-full border border-gray-100/10 bg-gray-300/5 p-0 text-gray-900 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:size-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-gray-300 before:opacity-0 before:transition-opacity before:content-[''] checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                  />
                  <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-slate-400 opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-full scale-105"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>

                <CiDeliveryTruck className="dark:text-slate-500" />

                <Label htmlFor="cod">Cash On Delivery</Label>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#405684] px-3 py-1.5 text-2xl font-bold text-white transition-all hover:scale-105 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-500"
              disabled={!isValid}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
export default OrderInfoPage
