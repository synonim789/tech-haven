import { useUserContext } from '../../context/UserContext'
import './ProfilePage.css'

const ProfilePage = () => {
  const { user } = useUserContext()
  return (
    <div className="profile-page">
      <div>
        <h3>Name:</h3>
        <p>{user.name ? user.name : 'Not set'}</p>
      </div>
      <div>
        <h3>Email:</h3>
        <p>{user.email ? user.email : 'Not set'}</p>
      </div>
      <div>
        <h3>Phone:</h3>
        <p>{user.phone ? user.phone : 'Not set'}</p>
      </div>
      <div>
        <h3>Street:</h3>
        <p>{user.street ? user.street : 'Not set'}</p>
      </div>
      <div>
        <h3>Apartment:</h3>
        <p>{user.apartment ? user.apartment : 'Not set'}</p>
      </div>
      <div>
        <h3>City:</h3>
        <p>{user.city ? user.city : 'Not set'}</p>
      </div>
      <div>
        <h3>Zip:</h3>
        <p>{user.zip ? user.zip : 'Not set'}</p>
      </div>
      <div>
        <h3>Country:</h3>
        <p>{user.country ? user.country : 'Not set'}</p>
      </div>
    </div>
  )
}
export default ProfilePage
