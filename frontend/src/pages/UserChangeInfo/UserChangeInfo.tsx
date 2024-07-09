import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import { useUpdateUserMutation } from '../../features/user/userApiSlice'
import { setUser } from '../../features/user/userSlice'
import { RootState } from '../../store'
import { decodeToken } from '../../utils/decodeToken'

type UserForm = {
  name?: string
  email?: string
  phone?: string
  street?: string
  apartment?: string
  city?: string
  zip?: string
  country?: string
}

const UserChangeInfo = () => {
  const [formUser, setFormUser] = useState<UserForm | null>(null)
  const { register, handleSubmit, reset } = useForm()
  const user = useSelector((state: RootState) => state.user.user)
  const token = useSelector((state: RootState) => state.auth.token)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const dispatch = useDispatch()
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    setFormUser({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      street: user?.street,
      apartment: user?.apartment,
      city: user?.city,
      zip: user?.zip,
      country: user?.country,
    })
  }, [])

  useEffect(() => {
    reset(formUser!)
  }, [formUser])
  function isUserDataChanged(data: UserForm, user: UserForm) {
    return Object.keys(data).some(
      (key) => data[key as keyof UserForm] !== user[key as keyof UserForm]
    )
  }

  const submitHandler = async (data: UserForm) => {
    if (user) {
      if (!isUserDataChanged(data, user)) {
        setEdited(false)
        toast.info('User data has not changed')
        return
      }
    }

    const decodedToken = decodeToken(token)
    if (decodedToken) {
      const { userId } = decodedToken
      await updateUser({ id: userId, data })
        .unwrap()
        .then((result) => {
          dispatch(setUser(result.data))
          toast.success('User info updated successfully')
        })
        .catch((err) => toast.error(err.data.message))
    }
  }

  return (
    <section className="mb-3">
      <h2 className="text-4xl font-bold mb-7 text-center dark:text-slate-500">
        Update Profile
      </h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-14"
        onSubmit={handleSubmit(submitHandler)}
        onChange={() => setEdited(true)}
      >
        <FormInput name="name" type="text" register={{ ...register('name') }} />
        <FormInput
          name="email"
          type="email"
          register={{ ...register('email') }}
          disabled
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
          disabled={!edited}
        />
        <button
          type="button"
          onClick={() => reset()}
          className="font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition bg-red-500 text-white"
        >
          Reset Info
        </button>
      </form>
    </section>
  )
}
export default UserChangeInfo
