import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
    } catch (err: any) {}
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 flex flex-col justify-center items-center rounded-xl shadow-2xl gap-5  max-w-sm md:gap-8 lg:gap-10 dark:bg-[#121212] w-full">
        <Link
          to="/"
          className="flex items-center text-[20px] text-[#405684] font-bold w-full"
        >
          <AiOutlineArrowLeft />
          Back Home
        </Link>

        <h2 className="text-2xl font-bold text-slate-600">
          <span className="text-[#405684]">Log In</span> |{' '}
          <Link to="/sign-up">Sign Up</Link>
        </h2>
        <form
          className="flex flex-col w-full  gap-4"
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
          className="text-[#405684] font-bold text-[20px] mt-4"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  )
}
export default LoginPage
