import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteUserModal from './DeleteUserModal'

const UserSettingsPage = () => {
  const [modalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="flex self-start flex-col gap-8 my-8">
      <h3 className="text-3xl font-semibold dark:text-slate-500">Settings</h3>
      <button
        className="bg-red-500 text-2xl text-white font-semibold py-2 px-4 rounded-lg hover:opacity-70 transition-all hover:scale-105 shadow-md"
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        Delete Account
      </button>
      <DeleteUserModal
        open={modalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      />
      <h3 className="text-3xl font-semibold dark:text-slate-500">
        Update Info
      </h3>
      <Link
        to="update"
        className="bg-[#405684] text-2xl text-white font-semibold py-2 px-4 rounded-lg hover:opacity-70 transition-all hover:scale-105 shadow-md"
      >
        Update Account Info
      </Link>
    </main>
  )
}
export default UserSettingsPage
