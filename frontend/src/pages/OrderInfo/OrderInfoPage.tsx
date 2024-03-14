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
    <section className="my-10 max-w-6xl mx-auto px-5">
      <div className="bg-white shadow-xl w-full p-5 rounded-xl dark:bg-[#121212]">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="md:grid md:grid-cols-2 md:gap-x-6"
        >
          <h4 className="text-3xl mb-4 font-bold text-slate-500">
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
          <h4 className="text-3xl mt-4 font-bold col-span-2 text-slate-500">
            Payment method:
          </h4>
          <div className="md:col-span-2 flex justify-between flex-col gap-4 md:flex-row mt-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex items-center text-2xl gap-2">
                <input
                  type="radio"
                  value="stripe"
                  {...register('payment', {
                    required: 'Payment form is required',
                  })}
                />
                <FaStripeS className="dark:text-slate-500" />
                <label htmlFor="stripe" className="dark:text-slate-500">
                  Stripe
                </label>
              </div>
              <div className="flex items-center gap-2 text-2xl">
                <input
                  type="radio"
                  value="Cash On Delivery"
                  {...register('payment', {
                    required: 'Payment form is required',
                  })}
                  className="dark:text-slate-500"
                />
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
              className="text-2xl font-bold bg-[#405684] text-white px-3 py-1.5 rounded-lg hover:scale-105 hover:opacity-90 transition-all disabled:cursor-not-allowed disabled:bg-gray-500"
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
