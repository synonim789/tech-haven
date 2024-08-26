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
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { setData } from '../../features/auth/authSlice'
import { loginSchema, LoginValues } from '../../validation/auth'

const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const dispatch = useDispatch()

  const submitHandler = async (data: LoginValues) => {
    try {
      const response = await login(data)
      if ('data' in response && response.data) {
        const token = response.data.token
        dispatch(setData(token))
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-5 rounded-xl bg-white  p-10 shadow-2xl md:gap-8 lg:gap-10 dark:bg-[#121212]">
        <Link
          to="/"
          className="flex w-full items-center text-[20px] font-bold text-[#405684]"
        >
          <AiOutlineArrowLeft />
          Back Home
        </Link>

        <h2 className="text-2xl font-bold text-slate-600">
          <span className="text-[#405684]">Log In</span> |{' '}
          <Link to="/sign-up">Sign Up</Link>
        </h2>
        <form
          className="flex w-full flex-col  gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              error={errors.email?.message}
              placeholder="Email"
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
            loadingText="Logging In..."
            text="Log In"
            className="w-fit"
          />
        </form>
        <Link
          to="/forgot-password"
          className="mt-4 text-[20px] font-bold text-[#405684]"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  )
}
export default LoginPage
