import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const UserProfileInfo = () => {
  const user = useSelector((state: RootState) => state.user.user)
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div>
        <h3 className="text-3xl font-semibold">Name:</h3>
        <p className="text-2xl">{user.name ? user.name : 'Not set'}</p>
      </div>
      <div>
        <h3 className="text-3xl font-semibold">Email:</h3>
        <p className="text-2xl">{user.email ? user.email : 'Not set'}</p>
      </div>
      <div>
        <h3 className="text-3xl font-semibold">Phone:</h3>
        <p className="text-2xl">{user.phone ? user.phone : 'Not set'}</p>
      </div>
      <div>
        <h3 className="text-3xl font-semibold">Street:</h3>
        <p className="text-2xl">{user.street ? user.street : 'Not set'}</p>
      </div>
      <div>
        <h3 className="text-3xl font-semibold">Apartment:</h3>
        <p className="text-2xl">
          {user.apartment ? user.apartment : 'Not set'}
        </p>
      </div>
      <div>
        <h3 className="text-3xl font-semibold">City:</h3>
        <p className="text-2xl">{user.city ? user.city : 'Not set'}</p>
      </div>
      <div>
        <h3 className="text-3xl font-semibold">Zip:</h3>
        <p className="text-2xl">{user.zip ? user.zip : 'Not set'}</p>
      </div>
      <div>
        <h3 className="text-3xl font-semibold">Country:</h3>
        <p className="text-2xl">{user.country ? user.country : 'Not set'}</p>
      </div>
    </div>
  )
}
export default UserProfileInfo
