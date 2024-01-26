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
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 flex flex-col justify-center items-center rounded-xl shadow-lg gap-10 dark:bg-[#121212]">
        <div className="w-full text-[#405684] font-bold">
          <Link to="/" className="flex items-center text-[20px]">
            <AiOutlineArrowLeft />
            Back Home
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-[#405684]">Forgot Password</h2>
        <form
          className="flex flex-col w-full justify-center items-center gap-7"
          onSubmit={handleSubmit(submitHandler)}
        >
          <label className="flex flex-col w-full text-[20px] font-bold cursor-pointer text-gray-400">
            <span>Email</span>
            <input
              type="email"
              id="email"
              className="px-3 py-2 border-[2px] border-solid border-slate-600 shadow-lg rounded-xl dark:bg-transparent dark:text-white"
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
            <p className="font-bold text-red-600 flex flex-col">
              {errors.email?.message}
            </p>
          </label>
          {error &&
            ('data' in error ? (
              <p className="font-bold text-red-600">{error.data.message}</p>
            ) : (
              ''
            ))}
          <button
            type="submit"
            className="bg-[#405684] text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <Link
          to="/login"
          className="font-bold text-[#405684] text-right w-full text-[20px]"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
export default ForgotPassword
