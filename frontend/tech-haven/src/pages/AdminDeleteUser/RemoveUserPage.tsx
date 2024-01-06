import { useGetUsersQuery } from '../../features/adminUser/adminUserApiSlice'
import AdminRemoveUser from './AdminRemoveUser'

const RemoveUserPage = () => {
  const { data: users } = useGetUsersQuery()

  return (
    <section>
      <h4 className="text-4xl font-semibold mb-7 text-center">Delete User</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users?.map((user) => {
          return <AdminRemoveUser user={user} key={user._id} />
        })}
      </div>
    </section>
  )
}
export default RemoveUserPage
