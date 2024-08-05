import { useGetUsersQuery } from '../../features/adminUser/adminUserApiSlice'
import EditSingleUser from './EditSingleUser'

const EditUserRolePage = () => {
  const { data: allUsers } = useGetUsersQuery()

  return (
    <section>
      <h4 className="mb-8 text-center text-4xl font-bold text-slate-500">
        Edit User Role
      </h4>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allUsers?.map((user) => {
          return <EditSingleUser user={user} key={user._id} />
        })}
      </div>
    </section>
  )
}
export default EditUserRolePage
