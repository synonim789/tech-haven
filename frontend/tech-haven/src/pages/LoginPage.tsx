import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

type LoginFormType = {
  email: string
  password: string
}

const LoginPage = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const {
    loggingError: error,
    loggingLoading: loading,
    loginUser,
  } = useAuthContext()!

  const form = useForm<LoginFormType>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 flex flex-col justify-center items-center rounded-xl shadow-lg gap-10">
        <div className="w-full text-[#120b90] font-bold">
          <Link to="/" className="flex items-center text-[20px]">
            <AiOutlineArrowLeft />
            Back Home
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-slate-600">
          <span className="text-[#120b90]">Log In</span> |{' '}
          <Link to="/sign-up">Sign Up</Link>
        </h1>
        <form
          className="flex flex-col w-full justify-center items-center gap-7"
          onSubmit={handleSubmit(loginUser)}
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
          <label className="flex flex-col w-full text-[20px] font-bold cursor-pointer">
            <span>Password</span>
            <div className="relative px-3 py-2  border-[2px] border-solid border-slate-300 shadow-lg rounded-xl flex justify-between">
              <input
                type={visiblePassword ? 'text' : 'password'}
                id="password"
                autoComplete="on"
                placeholder="Enter Password"
                className="h-[100%] text-[20px] outline-none"
                {...register('password', {
                  required: 'Password is required',
                })}
              ></input>
              <div
                onClick={() => {
                  setVisiblePassword(!visiblePassword)
                }}
              >
                {visiblePassword ? (
                  <AiOutlineEyeInvisible className="absolute top-[30%] right-[10px] cursor-pointer" />
                ) : (
                  <AiOutlineEye className="absolute top-[30%] right-[10px] cursor-pointer" />
                )}
              </div>
            </div>
            <p className="font-bold text-red-600 flex flex-col">
              {errors.password?.message}
            </p>
          </label>
          {error ? <p className="font-bold text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="bg-[#120b90] text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <Link
          to="/forgot-password"
          className="text-[#120b90] font-bold text-[20px]"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  )
}
export default LoginPage
