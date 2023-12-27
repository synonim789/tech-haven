import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import { useAuthContext } from '../../context/AuthContext'
import { useUserContext } from '../../context/UserContext'

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
        <FormInput name="name" type="text" register={{ ...register('name') }} />
        <FormInput
          name="email"
          type="email"
          register={{ ...register('email') }}
        />
        <FormInput
          name="phone"
          type="text"
          register={{ ...register('phone') }}
        />
        <FormInput
          name="street"
          type="text"
          register={{ ...register('street') }}
        />
        <FormInput
          name="apartment"
          type="text"
          register={{ ...register('street') }}
        />
        <FormInput name="city" type="text" register={{ ...register('city') }} />
        <FormInput name="zip" type="text" register={{ ...register('zip') }} />
        <FormInput
          name="country"
          type="text"
          register={{ ...register('country') }}
        />
        <FormButton
          loading={updateUserLoading}
          loadingText="Loading..."
          text="Update Info"
        />
        <button
          type="button"
          onClick={() => reset()}
          className="font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition bg-red-500 text-white"
        >
          Reset Info
        </button>
      </form>
    </main>
  )
}
export default UserChangeInfo
