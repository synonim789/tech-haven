import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../context/AuthContext'
import { useUserContext } from '../context/UserContext'

type userChangeInfoType = {
  name: string
  email: string
  phone: string
  street: string
  apartment: string
  city: string
  zip: string
  country: string
  token: string
}

const UserChangeInfo = () => {
  const [formUser, setFormUser] = useState<userChangeInfoType | null>(null)
  const { user, updateUser, updateUserLoading } = useUserContext()!
  const { register, handleSubmit, reset } = useForm<userChangeInfoType>()
  const { token } = useAuthContext()!

  useEffect(() => {
    setFormUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      street: user.street,
      apartment: user.apartment,
      city: user.city,
      zip: user.zip,
      country: user.country,
      token: token.token,
    })
  }, [])

  useEffect(() => {
    reset(formUser!)
  }, [formUser])

  return (
    <main>
      <h1 className="text-4xl font-bold mb-7">Update Profile</h1>
      <form
        className="grid grid-cols-2 gap-14"
        onSubmit={handleSubmit(updateUser)}
      >
        <div>
          <label htmlFor="name" className="block text-3xl font-semibold mb-3">
            Name:
          </label>
          <input
            type="text"
            {...register('name')}
            className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-3xl font-semibold mb-3">
            Email:
          </label>
          <input
            type="email"
            {...register('email')}
            className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-3xl font-semibold mb-3">
            Phone:
          </label>
          <input
            type="text"
            {...register('phone')}
            placeholder="Enter Phone"
            className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="street" className="block text-3xl font-semibold mb-3">
            Street:
          </label>
          <input
            type="text"
            {...register('street')}
            placeholder="Enter Street"
            className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-3xl font-semibold mb-3">
            Apartment:
          </label>
          <input
            type="text"
            {...register('apartment')}
            placeholder="Enter Apartment"
            className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-3xl font-semibold mb-3">
            City:
          </label>
          <input
            type="text"
            {...register('city')}
            placeholder="Enter City"
            className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-3xl font-semibold mb-3">
            ZIP:
          </label>
          <input
            type="text"
            {...register('zip')}
            placeholder="Enter ZIP"
            className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-3xl font-semibold mb-3">
            Country:
          </label>
          <input
            type="text"
            {...register('country')}
            placeholder="Enter Country"
            className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-fit justify-self-center bg-[#120b90] block text-2xl font-bold text-white rounded-xl transition hover:opacity-90 hover:scale-105 px-4 py-2"
        >
          {!updateUserLoading ? 'Update Info' : 'Loading...'}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="w-fit justify-self-center bg-red-500 block text-2xl font-bold text-white rounded-xl transition hover:opacity-90 hover:scale-105 px-4 py-2"
        >
          Reset Info
        </button>
      </form>
    </main>
  )
}
export default UserChangeInfo
