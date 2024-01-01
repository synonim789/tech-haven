import { useEffect } from 'react'
import { useAdminContext } from '../../context/AdminContext'

import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import EditSingleUser from './EditSingleUser'

const EditUserRolePage = () => {
  const { getAllUsers, allUsers, changeUserRoleError } = useAdminContext()!

  const token = useSelector((state: RootState) => state.auth.token)
  useEffect(() => {
    getAllUsers({ token: token })
  }, [])

  return (
    <section>
      <h4 className="text-4xl font-semibold mb-7 text-center">
        Edit User Role
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allUsers?.map((user) => {
          return <EditSingleUser user={user} key={user._id} />
        })}
      </div>
      {changeUserRoleError && (
        <p className="text-center mt-5 text-2xl font-bold text-red-500">
          {changeUserRoleError}
        </p>
      )}
    </section>
  )
}
export default EditUserRolePage
