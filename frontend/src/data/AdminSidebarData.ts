import { createElement } from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { IoIosHome } from 'react-icons/io'
import { LuPackageSearch } from 'react-icons/lu'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'

export const AdminSidebarData = [
  {
    title: 'Home',
    path: '',
    icon: createElement(IoIosHome),
  },
  {
    title: 'Products',
    path: 'products',
    icon: createElement(MdOutlineProductionQuantityLimits),
    subMenu: [
      {
        title: 'Add Product',
        path: 'addProduct',
      },
      {
        title: 'Remove Product',
        path: 'removeProduct',
      },
      {
        title: 'Edit Product',
        path: 'editProduct',
      },
    ],
  },
  {
    title: 'Categories',
    path: 'categories',
    icon: createElement(BiCategoryAlt),
    subMenu: [
      {
        title: 'Add Category',
        path: 'addCategory',
      },
      {
        title: 'Remove Category',
        path: 'removeCategory',
      },
      {
        title: 'Edit Category',
        path: 'editCategory',
      },
    ],
  },
  {
    title: 'Users',
    path: 'users',
    icon: createElement(FaUsers),
    subMenu: [
      {
        title: 'Edit User Role',
        path: 'editUserRole',
      },
      {
        title: 'Remove User',
        path: 'removeUser',
      },
    ],
  },
  {
    title: 'Orders',
    path: 'orders',
    icon: createElement(LuPackageSearch),
  },
]
