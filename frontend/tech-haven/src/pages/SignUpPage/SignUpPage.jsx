import { useState } from 'react'
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './SignUpPage.css'
const SignUpPage = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)

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
        <form action="" className="sign-up__form">
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              id="email"
              className="sign-up__input"
              placeholder="Enter Email"
            />
          </label>
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              id="name"
              className="sign-up__input"
              placeholder="Enter Name"
            />
          </label>
          <label>
            <span>Password</span>
            <div className="sign-up__password-container">
              <input
                type={visiblePassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter Password"
                className="sign-up__password-input"
              />
              <div
                onClick={() => {
                  setVisiblePassword(!visiblePassword)
                }}
              >
                {visiblePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </label>
          <button type="submit" className="sign-up__cta">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
export default SignUpPage
