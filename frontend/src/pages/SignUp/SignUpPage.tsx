import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import { useRegisterUserMutation } from '../../features/auth/authApiSlice'
import { setData } from '../../features/auth/authSlice'
import { signUpSchema, SignUpValues } from '../../validation/auth'

type ErrorWithData = {
  data?: {
    message: string
  }
}

const SignUpPage = () => {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
    },
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const dispatch = useDispatch()

  const [registerUser, { isLoading, error }] = useRegisterUserMutation()

  const submitHandler = async (data: SignUpValues) => {
    try {
      const { email, name, password } = data
      const response = await registerUser({ email, name, password })
      if ('data' in response && response.data) {
        const token = response.data.token
        dispatch(setData(token))
      }
    } catch (err) {
      if (err instanceof Error && 'data' in err) {
        const errorWithData = err as ErrorWithData
        toast.error(errorWithData.data?.message)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-5 rounded-xl bg-white  p-10 shadow-2xl md:gap-8 lg:gap-10 dark:bg-[#121212]">
        <div className="w-full font-bold text-[#405684]">
          <Link to="/" className="flex items-center text-[20px]">
            <AiOutlineArrowLeft />
            Back Home
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-slate-600">
          <Link to="/login">Log In</Link> |{' '}
          <span className="text-[#405684]">Sign Up</span>
        </h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              {...register('email')}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="text-red-500 font-semibold">{message}</p>
              )}
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              error={errors.name?.message}
              {...register('name')}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-red-500 font-semibold">{message}</p>
              )}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="*******"
              error={errors.password?.message}
              {...register('password')}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="text-red-500 font-semibold">{message}</p>
              )}
            />
          </div>

          {error && (
            <p className="font-bold text-red-500">
              {'data' in error ? error.data.message : ''}
            </p>
          )}
          <FormButton
            loading={isLoading}
            text="Sign Up"
            loadingText="Signing Up..."
            className="w-fit"
          />
        </form>
      </div>
    </div>
  )
}
export default SignUpPage
