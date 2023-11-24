import { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './AdminSidebarMenuLink.css'

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
        className="admin-sidebar__link"
        onClick={() => setShowSubMenu(!showSubMenu)}
      >
        <div>
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
              className="admin-sidebar__menu-item"
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
