import { useState } from 'react'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { AdminSidebarData } from '../data/AdminSidebarData'
import AdminSidebarMenuLink from './AdminSidebarMenuLink'

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full bg-white text-black lg:w-fit dark:bg-[#121212]">
      <IoIosMenu
        className="ml-6 cursor-pointer text-6xl lg:hidden dark:text-gray-700"
        onClick={() => setIsOpen(true)}
      />
      <nav
        className={`fixed top-0 z-20 h-full min-h-screen w-[250px] overflow-y-auto bg-white text-gray-700 transition-all duration-300 ease-in-out lg:static lg:inset-0 dark:bg-[#121212] ${
          isOpen ? ' left-0' : '-left-full top-0 '
        }`}
      >
        <div className="flex w-full cursor-pointer justify-end text-5xl lg:hidden">
          <IoMdClose onClick={() => setIsOpen(!isOpen)} />
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
        <Link
          to="/"
          className="flex h-[80px] w-full items-center justify-between p-3 text-2xl font-semibold text-gray-400 hover:border-l-[5px] hover:border-solid hover:border-l-[#405684] dark:text-gray-700 "
        >
          Return To Main Page
        </Link>
      </nav>
    </div>
  )
}
export default AdminSidebar
