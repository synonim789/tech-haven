import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import { useUpdateUserMutation } from '../../features/user/userApiSlice'
import { setUser } from '../../features/user/userSlice'
import { RootState } from '../../store'
import { decodeToken } from '../../utils/decodeToken'

const UserChangeInfo = () => {
  const [formUser, setFormUser] = useState(null)
  const { register, handleSubmit, reset } = useForm()
  const user = useSelector((state: RootState) => state.user.user)
  const token = useSelector((state: RootState) => state.auth.token)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const dispatch = useDispatch()

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
    })
  }, [])

  useEffect(() => {
    reset(formUser!)
  }, [formUser])

  const submitHandler = async (data) => {
    try {
      const { userId } = decodeToken(token)
      const result = await updateUser({ id: userId, data })
      dispatch(setUser(result.data))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <h1 className="text-4xl font-bold mb-7">Update Profile</h1>
      <form
        className="grid grid-cols-2 gap-14"
        onSubmit={handleSubmit(submitHandler)}
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
          loading={isLoading}
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
