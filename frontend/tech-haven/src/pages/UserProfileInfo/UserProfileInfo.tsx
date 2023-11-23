import { useUserContext } from '../../context/UserContext'
import './UserProfileInfo.css'

const UserProfileInfo = () => {
  const { user } = useUserContext()!
  return (
    <div className="profile-info">
      <div>
        <h3 className="profile-info__title">Name:</h3>
        <p className="profile-info__description">
          {user.name ? user.name : 'Not set'}
        </p>
      </div>
      <div>
        <h3 className="profile-info__title">Email:</h3>
        <p className="profile-info__description">
          {user.email ? user.email : 'Not set'}
        </p>
      </div>
      <div>
        <h3 className="profile-info__title">Phone:</h3>
        <p className="profile-info__description">
          {user.phone ? user.phone : 'Not set'}
        </p>
      </div>
      <div>
        <h3 className="profile-info__title">Street:</h3>
        <p className="profile-info__description">
          {user.street ? user.street : 'Not set'}
        </p>
      </div>
      <div>
        <h3 className="profile-info__title">Apartment:</h3>
        <p className="profile-info__description">
          {user.apartment ? user.apartment : 'Not set'}
        </p>
      </div>
      <div>
        <h3 className="profile-info__title">City:</h3>
        <p className="profile-info__description">
          {user.city ? user.city : 'Not set'}
        </p>
      </div>
      <div>
        <h3 className="profile-info__title">Zip:</h3>
        <p className="profile-info__description">
          {user.zip ? user.zip : 'Not set'}
        </p>
      </div>
      <div>
        <h3 className="profile-info__title">Country:</h3>
        <p className="profile-info__description">
          {user.country ? user.country : 'Not set'}
        </p>
      </div>
    </div>
  )
}
export default UserProfileInfo
