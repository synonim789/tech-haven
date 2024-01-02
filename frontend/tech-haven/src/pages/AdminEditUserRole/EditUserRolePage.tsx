import {
  useChangeUserRoleMutation,
  useGetUsersQuery,
} from '../../features/adminUser/adminUserApiSlice'
import EditSingleUser from './EditSingleUser'

const EditUserRolePage = () => {
  // const { getAllUsers, allUsers, changeUserRoleError } = useAdminContext()!

  const { data: allUsers } = useGetUsersQuery()
  const [changeUserRole, { error, isLoading }] = useChangeUserRoleMutation()

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
      {error && (
        <p className="text-center mt-5 text-2xl font-bold text-red-500">
          {error}
        </p>
      )}
    </section>
  )
}
export default EditUserRolePage
