import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import './ForgotPassword.css'
const ForgotPassword = () => {
  const form = useForm()
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const {
    forgotLoading: loading,
    forgotError: error,
    forgetPassword,
  } = useAuthContext()
  return (
    <div className="forgot-password">
      <div className="forgot-password__container">
        <div className="login-page__back">
          <Link to="/">
            <AiOutlineArrowLeft />
            Back Home
          </Link>
        </div>
        <h1 className="forgot-password__title">Forgot Password</h1>
        <form
          className="forgot-password__form"
          onSubmit={handleSubmit(forgetPassword)}
        >
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              id="email"
              className="forgot-password__input"
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
            <p className="forgot-password__input-error">
              {errors.email?.message}
            </p>
          </label>
          {error ? <p className="forgot-password__error">{error}</p> : null}
          <button type="submit" className="forgot-password__cta">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <Link to="/login" className="forgot-password__link">
          Login
        </Link>
      </div>
    </div>
  )
}
export default ForgotPassword
