import { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { Link } from 'react-router-dom'

type AdminSidebarMenuLinkPropsType = {
  item:
    | {
        title: string
        path: string
        icon: JSX.Element
        subMenu?: undefined
      }
    | {
        title: string
        path: string
        icon: JSX.Element
        subMenu: {
          title: string
          path: string
        }[]
      }
  hideMenu: () => void
}

const AdminSidebarMenuLink = ({
  item,
  hideMenu,
}: AdminSidebarMenuLinkPropsType) => {
  const [showSubMenu, setShowSubMenu] = useState(false)
  return (
    <>
      <Link
        to={item.path}
        className="text-white text-2xl font-semibold flex items-center justify-between p-3 w-full h-[80px] hover:bg-[#353839] hover:border-l-[5px] hover:border-solid hover:border-l-[#120b90]"
        onClick={() => setShowSubMenu(!showSubMenu)}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          <span>{item.title}</span>
        </div>

        {item.subMenu && showSubMenu ? (
          <IoMdArrowDropup />
        ) : item.subMenu ? (
          <IoMdArrowDropdown />
        ) : null}
      </Link>
      {showSubMenu &&
        item.subMenu &&
        item.subMenu.map((menu) => {
          return (
            <Link
              to={menu.path}
              key={menu.path}
              className="text-white h-[60px]  bg-[#3b444b]  pl-10 flex items-center hover:bg-[#192b90]"
              onClick={hideMenu}
            >
              {menu.title}
            </Link>
          )
        })}
    </>
  )
}
export default AdminSidebarMenuLink
