import { useGetUsersQuery } from '../../features/adminUser/adminUserApiSlice'
import AdminRemoveUser from './AdminRemoveUser'

const RemoveUserPage = () => {
  const { data: users } = useGetUsersQuery()

  return (
    <section>
      <h4 className="mb-8 text-center text-4xl font-bold text-slate-500">
        Delete User
      </h4>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => {
          return <AdminRemoveUser user={user} key={user._id} />
        })}
      </div>
    </section>
  )
}
export default RemoveUserPage
