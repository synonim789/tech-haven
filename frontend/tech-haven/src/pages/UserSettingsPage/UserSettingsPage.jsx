import { useState } from 'react'
import DeleteUserModal from '../../components/DeleteUserModal/DeleteUserModal'
import './UserSettingsPage.css'

const UserSettingsPage = () => {
  const [modalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="settings">
      <h1 className="settings__title">Settings</h1>
      <button
        className="settings__delete"
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
    </main>
  )
}
export default UserSettingsPage
