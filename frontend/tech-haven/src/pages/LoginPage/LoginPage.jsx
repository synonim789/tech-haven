import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './LoginPage.css'

const LoginPage = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  return (
    <div className="login-page">
      <div className="login-page__container">
        <h1 className="login-page__title">
          <span>Log In</span> | <Link to="/register">Sign Up</Link>
        </h1>
        <form className="login-page__form">
          <label>
            <span>Email</span>
            <input
              type="email"
              name=""
              id=""
              className="login-page__input"
              placeholder="Enter Email"
            />
          </label>
          <label>
            <span>Password</span>
            <div className="login-page__password-container">
              <input
                type={visiblePassword ? 'text' : 'password'}
                name=""
                id=""
                placeholder="Enter Password"
                className="login-page__password-input"
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
          <button type="submit" className="login-page__cta">
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}
export default LoginPage
