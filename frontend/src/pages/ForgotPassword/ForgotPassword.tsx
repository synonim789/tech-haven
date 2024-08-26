import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import { useForgotPasswordMutation } from '../../features/auth/authApiSlice'
import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from '../../validation/auth'

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation()

  const submitHandler = async (data: ForgotPasswordValues) => {
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
          className="flex w-full flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
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
