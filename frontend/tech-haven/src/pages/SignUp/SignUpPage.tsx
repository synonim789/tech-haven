import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import { useRegisterUserMutation } from '../../features/auth/authApiSlice'
import { setData } from '../../features/auth/authSlice'

type SignUpFormType = {
  email: string
  name: string
  password: string
}

const SignUpPage = () => {
  const form = useForm<SignUpFormType>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const dispatch = useDispatch()

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation()

  const submitHandler = async (data) => {
    try {
      const { email, name, password } = data
      const token = await registerUser({ email, name, password })
      dispatch(setData(token.data.token))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 flex flex-col justify-center items-center rounded-xl shadow-lg gap-10">
        <div className="w-full text-[#120b90] font-bold">
          <Link to="/" className="flex items-center text-[20px]">
            <AiOutlineArrowLeft />
            Back Home
          </Link>
        </div>
        <h1 className="text-slate-600 text-2xl font-bold">
          <Link to="/login">Log In</Link> |{' '}
          <span className="text-[#120b90]">Sign Up</span>
        </h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col w-full justify-center items-center gap-7"
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
            name="name"
            type="text"
            error={errors.name?.message}
            register={{
              ...register('name', {
                required: 'Name is Required',
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
          {isError ? (
            <p className="font-bold text-red-600 text-[20px]">
              {error.data.message}
            </p>
          ) : null}
          <FormButton
            loading={isLoading}
            text="Sign Up"
            loadingText="Signing Up..."
          />
        </form>
      </div>
    </div>
  )
}
export default SignUpPage
