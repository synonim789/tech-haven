import { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { Link } from 'react-router-dom'

type Props = {
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

const AdminSidebarMenuLink = ({ item, hideMenu }: Props) => {
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
        className="flex h-[80px] w-full items-center justify-between p-3 text-2xl font-semibold text-gray-700 hover:border-l-[5px] hover:border-solid hover:border-l-[#405684] dark:text-slate-500"
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
              className="flex h-[60px] items-center pl-10 font-bold text-gray-500 hover:bg-[#192b90] hover:text-white"
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
