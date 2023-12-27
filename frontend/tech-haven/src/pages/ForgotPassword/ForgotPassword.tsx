import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

type ForgotPasswordFormType = {
  email: string
}

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormType>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const {
    forgotLoading: loading,
    forgotError: error,
    forgetPassword,
  } = useAuthContext()!
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 flex flex-col justify-center items-center rounded-xl shadow-lg gap-10">
        <div className="w-full text-[#120b90] font-bold">
          <Link to="/" className="flex items-center text-[20px]">
            <AiOutlineArrowLeft />
            Back Home
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-[#120b90]">Forgot Password</h1>
        <form
          className="flex flex-col w-full justify-center items-center gap-7"
          onSubmit={handleSubmit(forgetPassword)}
        >
          <label className="flex flex-col w-full text-[20px] font-bold cursor-pointer">
            <span>Email</span>
            <input
              type="email"
              id="email"
              className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
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
          {error ? <p className="font-bold text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="bg-[#120b90] text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <Link
          to="/login"
          className="font-bold text-[#120b90] text-right w-full text-[20px]"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
export default ForgotPassword
