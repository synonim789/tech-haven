import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import { useUpdateUserMutation } from '../../features/user/userApiSlice'
import { setUser } from '../../features/user/userSlice'
import { RootState } from '../../store'
import { decodeToken } from '../../utils/decodeToken'
import { editUserSchema, EditUserValues } from '../../validation/user'

const UserChangeInfo = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const token = useSelector((state: RootState) => state.auth.token)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      apartment: user?.apartment,
      city: user?.city,
      country: user?.country,
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
      street: user?.street,
      zip: user?.zip,
    },
  })

  const submitHandler = async (data: EditUserValues) => {
    const decodedToken = decodeToken(token)
    if (decodedToken) {
      const { userId } = decodedToken
      await updateUser({ id: userId, data })
        .unwrap()
        .then((result) => {
          dispatch(setUser(result.data))
          toast.success('User info updated successfully')
          navigate('/profile/settings')
        })
        .catch((err) => toast.error(err.data.message))
    }
  }

  return (
    <section className="mb-3">
      <h2 className="mb-7 text-center text-4xl font-bold dark:text-slate-500">
        Update Profile
      </h2>
      <form
        className="grid grid-cols-1 gap-14 md:grid-cols-2"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            disabled
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Phone"
            type="text"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="street">Street</Label>
          <Input
            id="street"
            placeholder="Street"
            type="text"
            error={errors.street?.message}
            {...register('street')}
          />
          <ErrorMessage
            errors={errors}
            name="street"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="apartment">Apartment</Label>
          <Input
            id="apartment"
            placeholder="Apartment"
            type="text"
            error={errors.apartment?.message}
            {...register('apartment')}
          />
          <ErrorMessage
            errors={errors}
            name="apartment"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="City"
            type="text"
            error={errors.city?.message}
            {...register('city')}
          />
          <ErrorMessage
            errors={errors}
            name="city"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="zip">Zip</Label>
          <Input
            type="text"
            id="zip"
            placeholder="Zip-Code"
            {...register('zip')}
            error={errors.zip?.message}
          />
          <ErrorMessage
            errors={errors}
            name="zip"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="Country"
            type="text"
            {...register('country')}
            error={errors.country?.message}
          />
          <ErrorMessage
            errors={errors}
            name="country"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <FormButton
          loading={isLoading}
          loadingText="Loading..."
          text="Update Info"
        />
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-red-500 px-4 py-2 text-[24px] font-bold text-white transition hover:scale-105 hover:opacity-80"
        >
          Reset Info
        </button>
      </form>
    </section>
  )
}
export default UserChangeInfo
