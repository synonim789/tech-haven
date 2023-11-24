import { useState } from 'react'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import AdminSidebarMenuLink from '../AdminSidebarMenuLink/AdminSidebarMenuLink'
import './AdminSidebar.css'
import { AdminSidebarData } from './AdminSidebartData'

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="admin-sidebar">
      <IoIosMenu
        className="admin-sidebar__hamburger"
        onClick={() => setIsOpen(true)}
      />
      <nav
        className={isOpen ? 'admin-sidebar__nav active' : 'admin-sidebar__nav'}
      >
        <div className="admin-sidebar__close" onClick={() => setIsOpen(false)}>
          <IoMdClose />
        </div>
        {AdminSidebarData.map((item, index) => {
          return (
            <AdminSidebarMenuLink
              item={item}
              key={index}
              hideMenu={() => setIsOpen(false)}
            />
          )
        })}
        <Link to="/" className="admin-sidebar__link admin-sidebar__return">
          Return To Main Page
        </Link>
      </nav>
    </div>
  )
}
export default AdminSidebar
