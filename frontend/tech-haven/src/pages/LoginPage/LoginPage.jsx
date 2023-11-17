import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import './LoginPage.css'

const LoginPage = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const {
    loggingError: error,
    loggingLoading: loading,
    loginUser,
  } = useAuthContext()

  const form = useForm()
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__back">
          <Link to="/">
            <AiOutlineArrowLeft />
            Back Home
          </Link>
        </div>

        <h1 className="login-page__title">
          <span>Log In</span> | <Link to="/sign-up">Sign Up</Link>
        </h1>
        <form className="login-page__form" onSubmit={handleSubmit(loginUser)}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              id="email"
              className="login-page__input"
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
            <p className="login-page__input__error">{errors.email?.message}</p>
          </label>
          <label>
            <span>Password</span>
            <div className="login-page__password-container">
              <input
                type={visiblePassword ? 'text' : 'password'}
                name="password"
                id="password"
                autoComplete="on"
                placeholder="Enter Password"
                className="login-page__password-input"
                {...register('password', {
                  required: 'Password is required',
                })}
              ></input>
              <div
                onClick={() => {
                  setVisiblePassword(!visiblePassword)
                }}
              >
                {visiblePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            <p className="login-page__input__error">
              {errors.password?.message}
            </p>
          </label>
          {error ? <p className="login-page__error">{error}</p> : null}
          <button type="submit" className="login-page__cta">
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <Link to="/forgot-password" className="login-page__forgot-pass">
          Forgot Password?
        </Link>
      </div>
    </div>
  )
}
export default LoginPage
