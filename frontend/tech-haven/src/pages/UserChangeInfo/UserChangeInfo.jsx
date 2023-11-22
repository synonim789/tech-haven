import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../context/AuthContext'
import { useUserContext } from '../../context/UserContext'
import './UserChangeInfo.css'

const UserChangeInfo = () => {
  const [formUser, setFormUser] = useState(null)
  const { user, updateUser, updateUserLoading } = useUserContext()
  const { register, handleSubmit, reset } = useForm()
  const { token } = useAuthContext()

  useEffect(() => {
    setFormUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      street: user.phone,
      apartment: user.apartment,
      city: user.city,
      zip: user.zip,
      country: user.country,
      token: token.token,
    })
  }, [])

  useEffect(() => {
    reset(formUser)
  }, [formUser])

  return (
    <main className="user-change">
      <h1 className="user-change__title">Update Profile</h1>
      <form
        action="#"
        className="user-change__form"
        onSubmit={handleSubmit(updateUser)}
      >
        <div className="user-change__form-container">
          <label htmlFor="name" className="user-change__label">
            Name:
          </label>
          <input
            type="text"
            {...register('name')}
            className="user-change__input"
          />
        </div>
        <div className="user-change__form-container">
          <label htmlFor="name" className="user-change__label">
            Email:
          </label>
          <input
            type="email"
            {...register('email')}
            className="user-change__input"
          />
        </div>
        <div className="user-change__form-container">
          <label htmlFor="name" className="user-change__label">
            Phone:
          </label>
          <input
            type="text"
            {...register('phone')}
            placeholder="Enter Phone"
            className="user-change__input"
          />
        </div>
        <div className="user-change__form-container">
          <label htmlFor="name" className="user-change__label">
            Street:
          </label>
          <input
            type="text"
            {...register('street')}
            placeholder="Enter Street"
            className="user-change__input"
          />
        </div>
        <div className="user-change__form-container">
          <label htmlFor="name" className="user-change__label">
            Apartment:
          </label>
          <input
            type="text"
            {...register('apartment')}
            placeholder="Enter Apartment"
            className="user-change__input"
          />
        </div>
        <div className="user-change__form-container">
          <label htmlFor="name" className="user-change__label">
            City:
          </label>
          <input
            type="text"
            {...register('city')}
            placeholder="Enter City"
            className="user-change__input"
          />
        </div>
        <div className="user-change__form-container">
          <label htmlFor="name" className="user-change__label">
            ZIP:
          </label>
          <input
            type="text"
            {...register('zip')}
            placeholder="Enter ZIP"
            className="user-change__input"
          />
        </div>
        <div className="user-change__form-container">
          <label htmlFor="name" className="user-change__label">
            Country:
          </label>
          <input
            type="text"
            {...register('country')}
            placeholder="Enter Country"
            className="user-change__input"
          />
        </div>
        <button type="submit" className="user-change__submit">
          {!updateUserLoading ? 'Update Info' : 'Loading...'}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="user-change__reset"
        >
          Reset Info
        </button>
      </form>
    </main>
  )
}
export default UserChangeInfo
