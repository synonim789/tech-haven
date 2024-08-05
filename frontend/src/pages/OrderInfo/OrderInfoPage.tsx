import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaStripeS } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import FormInput from '../../components/form/FormInput'
import { placeOrder } from '../../features/orders/ordersSlice'
import { RootState } from '../../store'

type OrderInfo = {
  name?: string
  zip?: string
  city?: string
  country?: string
  phone?: string
  street?: string
  apartment?: string
  payment?: string
}

const OrderInfoPage = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const [orderInfoForm, setOrderInfoForm] = useState<OrderInfo | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setOrderInfoForm({
      name: user?.name,
      city: user?.city,
      country: user?.country,
      phone: user?.phone,
      street: user?.street,
      zip: user?.zip,
      apartment: user?.apartment,
      payment: 'paypal',
    })
  }, [user])

  const { register, handleSubmit, reset, formState } = useForm<OrderInfo>()
  const { errors, isValid } = formState

  useEffect(() => {
    reset(orderInfoForm!)
  }, [orderInfoForm])

  const submitHandler = (data: OrderInfo) => {
    navigate('/order/summary')
    dispatch(placeOrder(data))
  }

  return (
    <section className="my-10 max-w-6xl md:mx-auto">
      <div className="w-full rounded-xl bg-white p-5 shadow-xl dark:bg-[#121212]">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col md:grid md:grid-cols-2 md:gap-x-6"
        >
          <h4 className="mb-4 text-3xl font-bold text-slate-500">
            Delivery Info:
          </h4>
          <div className="md:col-span-2">
            <FormInput
              name="name"
              type="text"
              register={{
                ...register('name', {
                  required: 'Name is required',
                }),
              }}
              error={errors?.name?.message}
            />
          </div>

          <FormInput
            name="zip"
            type="text"
            register={{
              ...register('zip', {
                required: 'Zip is required',
              }),
            }}
            error={errors?.zip?.message}
          />
          <FormInput
            name="city"
            type="text"
            register={{
              ...register('city', {
                required: 'City is required',
              }),
            }}
            error={errors?.city?.message}
          />
          <FormInput
            name="country"
            type="text"
            register={{
              ...register('country', {
                required: 'Country is required',
              }),
            }}
            error={errors?.country?.message}
          />
          <FormInput
            name="phone"
            type="text"
            register={{
              ...register('phone', {
                required: 'Phone is required',
              }),
            }}
            error={errors?.phone?.message}
          />
          <FormInput
            name="street"
            type="text"
            register={{
              ...register('street', {
                required: 'Street is required',
              }),
            }}
            error={errors?.street?.message}
          />
          <FormInput
            name="apartment"
            type="text"
            register={{
              ...register('apartment', {
                required: 'Apartment is required',
              }),
            }}
            error={errors?.apartment?.message}
          />
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
                    className="before:content[''] peer relative size-5 cursor-pointer appearance-none rounded-full border border-gray-100/10 bg-gray-300/5 p-0 text-gray-900 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:size-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-gray-300 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
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
                <label htmlFor="stripe" className="dark:text-slate-500">
                  Stripe
                </label>
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
                    className="before:content[''] peer relative size-5 cursor-pointer appearance-none rounded-full border border-gray-100/10 bg-gray-300/5 p-0 text-gray-900 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:size-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-gray-300 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
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

                <label
                  htmlFor="Cash On Delivery"
                  className="dark:text-slate-500"
                >
                  Cash On Delivery
                </label>
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
