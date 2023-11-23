import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import './SignUpPage.css'

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
    <div className="sign-up-page">
      <div className="sign-up__container">
        <div className="sign-up__back">
          <Link to="/">
            <AiOutlineArrowLeft />
            Back Home
          </Link>
        </div>
        <h1 className="sign-up__title">
          <Link to="/login">Log In</Link> | <span>Sign Up</span>
        </h1>
        <form onSubmit={handleSubmit(registerUser)} className="sign-up__form">
          <label>
            <span>Email</span>
            <input
              type="email"
              id="email"
              className="sign-up__input"
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
            <p className="sign-up__input-error">{errors.email?.message}</p>
          </label>
          <label>
            <span>Name</span>
            <input
              type="text"
              id="name"
              className="sign-up__input"
              placeholder="Enter Name"
              {...register('name', {
                required: 'Name is Required',
              })}
            />
            <p className="sign-up__input-error">{errors.name?.message}</p>
          </label>
          <label>
            <span>Password</span>
            <div className="sign-up__password-container">
              <input
                type={visiblePassword ? 'text' : 'password'}
                id="password"
                autoComplete="on"
                placeholder="Enter Password"
                className="sign-up__password-input"
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
                {visiblePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            <p className="sign-up__input-error">
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
          {error ? <p className="sign-up__error">{error}</p> : null}
          <button type="submit" className="sign-up__cta">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default SignUpPage
