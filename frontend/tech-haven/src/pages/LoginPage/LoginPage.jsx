import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import './LoginPage.css'

const LoginPage = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const { error, loading, loginUser, user } = useUserContext()

  const form = useForm()
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  return (
    <div className="login-page">
      <div className="login-page__container">
        <h1 className="login-page__title">
          <span>Log In</span> | <Link to="/register">Sign Up</Link>
        </h1>
        <form className="login-page__form" onSubmit={handleSubmit(loginUser)}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name=""
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
          </label>
          <label>
            <span>Password</span>
            <div className="login-page__password-container">
              <input
                type={visiblePassword ? 'text' : 'password'}
                name=""
                id="password"
                placeholder="Enter Password"
                className="login-page__password-input"
                {...register('password', { required: 'Password is required' })}
              ></input>
              <div
                onClick={() => {
                  setVisiblePassword(!visiblePassword)
                }}
              >
                {visiblePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </label>
          {error ? <p className="login-page__error">{error}</p> : null}
          <button type="submit" className="login-page__cta">
            {loading ? 'Logging in' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default LoginPage
