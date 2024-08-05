import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForgotPasswordMutation } from '../../features/auth/authApiSlice'

type ForgotPasswordFormType = {
  email: string
}

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormType>()
  const { register, handleSubmit, formState } = form
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation()
  const { errors } = formState

  const submitHandler = async (data: ForgotPasswordFormType) => {
    try {
      const { email } = data
      await forgotPassword({ email }).unwrap()
      toast.success('Link to reset password was sent to your email')
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
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
        <h2 className="text-2xl font-bold text-[#405684]">Forgot Password</h2>
        <form
          className="flex w-full flex-col items-center justify-center gap-7"
          onSubmit={handleSubmit(submitHandler)}
        >
          <label className="flex w-full cursor-pointer flex-col text-[20px] font-bold text-gray-400">
            <span>Email</span>
            <input
              type="email"
              id="email"
              className="rounded-xl border-2 border-solid border-slate-600 px-3 py-2 shadow-lg dark:bg-transparent dark:text-white"
              placeholder="Enter Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: 'Invalid email',
                },
              })}
            />
            <p className="flex flex-col font-bold text-red-500">
              {errors.email?.message}
            </p>
          </label>
          {error &&
            ('data' in error ? (
              <p className="font-bold text-red-500">{error.data.message}</p>
            ) : (
              ''
            ))}
          <button
            type="submit"
            className="rounded-lg bg-[#405684] px-4 py-2 text-[24px] font-bold text-white transition hover:scale-105 hover:opacity-80"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <Link
          to="/login"
          className="w-full text-right text-[20px] font-bold text-[#405684]"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
export default ForgotPassword
