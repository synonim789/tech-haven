import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { setData } from '../../features/auth/authSlice'

type LoginFormType = {
  email: string
  password: string
}

const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation()

  const form = useForm<LoginFormType>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const dispatch = useDispatch()

  const submitHandler = async (data: LoginFormType) => {
    try {
      const response = await login(data)
      if ('data' in response && response.data) {
        const token = response.data.token
        dispatch(setData(token))
      }
    } catch (err: any) {
      toast.error(err.message)
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
          <FormInput
            name="email"
            type="email"
            error={errors.email?.message}
            register={{
              ...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: 'Invalid email',
                },
              }),
            }}
          />
          <FormInput
            name="password"
            type="password"
            error={errors.password?.message}
            register={{
              ...register('password', {
                required: 'Password is required',
              }),
            }}
          />

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
