import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteUserModal from '../../components/DeleteUserModal/DeleteUserModal'
import './UserSettingsPage.css'

const UserSettingsPage = () => {
  const [modalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="settings">
      <h3 className="settings__title">Settings</h3>
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
      <h3 className="settings__title">Update Info</h3>
      <Link to="update" className="settings__update">
        Update Account Info
      </Link>
    </main>
  )
}
export default UserSettingsPage
