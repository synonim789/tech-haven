import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteUserModal from './DeleteUserModal'

const UserSettingsPage = () => {
  const [modalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="my-8 flex flex-col gap-8 self-start">
      <h3 className="text-3xl font-semibold dark:text-slate-500">Settings</h3>
      <button
        className="rounded-lg bg-red-500 px-4 py-2 text-2xl font-semibold text-white shadow-md transition-all hover:scale-105 hover:opacity-70"
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
        className="rounded-lg bg-[#405684] px-4 py-2 text-2xl font-semibold text-white shadow-md transition-all hover:scale-105 hover:opacity-70"
      >
        Update Account Info
      </Link>
    </main>
  )
}
export default UserSettingsPage
