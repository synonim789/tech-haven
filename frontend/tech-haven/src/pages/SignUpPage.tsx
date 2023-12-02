import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

type SignUpFormType = {
  email: string
  name: string
  password: string
}

const SignUpPage = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const form = useForm<SignUpFormType>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const {
    signingError: error,
    signingLoading: loading,
    registerUser,
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
        <h1 className="text-slate-600 text-2xl font-bold">
          <Link to="/login">Log In</Link> |{' '}
          <span className="text-[#120b90]">Sign Up</span>
        </h1>
        <form
          onSubmit={handleSubmit(registerUser)}
          className="flex flex-col w-full justify-center items-center gap-7"
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
                  message: 'Email is wrong',
                },
              })}
            />
            <p className="font-bold text-red-600 flex flex-col">
              {errors.email?.message}
            </p>
          </label>
          <label className="flex flex-col w-full text-[20px] font-bold cursor-pointer">
            <span>Name</span>
            <input
              type="text"
              id="name"
              className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl"
              placeholder="Enter Name"
              {...register('name', {
                required: 'Name is Required',
              })}
            />
            <p className="font-bold text-red-600 flex flex-col">
              {errors.name?.message}
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
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  },
                })}
              />
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
            <p className="font-bold text-red-600 flex flex-col flex-wrap">
              {errors.password && errors.password.type === 'pattern' && (
                <>
                  <span>- at least 8 characters</span>
                  <span>
                    - must contain at least 1 uppercase letter, 1 lowercase
                    letter, and 1 number
                  </span>
                  <span>- Can contain special characters</span>
                </>
              )}
              {errors.password &&
                errors.password.type === 'required' &&
                'Password is required'}
            </p>
          </label>
          {error ? (
            <p className="font-bold text-red-600 text-[20px]">{error}</p>
          ) : null}
          <button
            type="submit"
            className="bg-[#120b90] text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default SignUpPage
