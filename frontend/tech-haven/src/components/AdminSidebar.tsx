import { useState } from 'react'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { AdminSidebarData } from './AdminSidebartData'
import AdminSidebarMenuLink from './AdminSidebarMenuLink'

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-white text-black">
      <IoIosMenu
        className="text-6xl ml-6 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <nav
        className={
          isOpen
            ? 'bg-[#0e1111] text-white min-h-screen w-[250px] fixed top-0 left-0 transition duration-700'
            : 'bg-[#0e1111] text-white min-h-screen w-[250px] fixed top-0 -left-[100%]'
        }
      >
        <div
          className="text-5xl cursor-pointer w-full flex justify-end"
          onClick={() => setIsOpen(false)}
        >
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
        <Link
          to="/"
          className="text-white text-2xl font-semibold flex items-center justify-between p-3 w-full h-[80px] hover:bg-[#353839] hover:border-l-[5px] hover:border-solid hover:border-l-[#120b90] "
        >
          Return To Main Page
        </Link>
      </nav>
    </div>
  )
}
export default AdminSidebar
