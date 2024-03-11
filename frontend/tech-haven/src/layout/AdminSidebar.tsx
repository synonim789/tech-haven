import { useState } from 'react'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { AdminSidebarData } from '../data/AdminSidebartData'
import AdminSidebarMenuLink from './AdminSidebarMenuLink'

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white text-black w-full lg:w-fit dark:bg-[#121212]">
      <IoIosMenu
        className="text-6xl ml-6 cursor-pointer lg:hidden dark:text-gray-700"
        onClick={() => setIsOpen(true)}
      />
      <nav
        className={`dark:bg-[#121212] bg-white text-gray-700 h-full overflow-y-auto min-h-screen w-[250px] lg:static lg:inset-0 fixed top-0 transition-all ease-in-out duration-300 z-20 ${
          isOpen ? ' left-0' : 'top-0 -left-[100%] '
        }`}
      >
        <div className="text-5xl cursor-pointer w-full flex justify-end lg:hidden">
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
          className="text-gray-400 dark:text-gray-700 text-2xl font-semibold flex items-center justify-between p-3 w-full h-[80px] hover:border-l-[5px] hover:border-solid hover:border-l-[#405684] "
        >
          Return To Main Page
        </Link>
      </nav>
    </div>
  )
}
export default AdminSidebar
