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

  const handleClick = () => {
    if (!item.subMenu) {
      hideMenu()
      setShowSubMenu(false)
    } else {
      setShowSubMenu(!showSubMenu)
    }
  }

  return (
    <>
      <Link
        to={item.path}
        className="text-gray-700 dark:text-slate-500 text-2xl font-semibold flex items-center justify-between p-3 w-full h-[80px] h hover:border-l-[5px] hover:border-solid hover:border-l-[#405684]"
        onClick={() => handleClick()}
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
              className="text-gray-500 h-[60px] font-bold pl-10 flex items-center hover:bg-[#192b90] hover:text-white"
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
