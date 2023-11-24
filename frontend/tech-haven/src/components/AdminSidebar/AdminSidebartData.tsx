import { BiCategoryAlt } from 'react-icons/bi'
import { FaChartBar, FaUsers } from 'react-icons/fa'
import { IoIosHome } from 'react-icons/io'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'

export const AdminSidebarData = [
  {
    title: 'Home',
    path: '',
    icon: <IoIosHome />,
  },
  {
    title: 'Products',
    path: 'products',
    icon: <MdOutlineProductionQuantityLimits />,
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
    icon: <BiCategoryAlt />,
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
    icon: <FaUsers />,
    subMenu: [
      {
        title: 'Add Admin User',
        path: 'addAdminUser',
      },
      {
        title: 'Remove User',
        path: 'removeUser',
      },
    ],
  },
  {
    title: 'Statistics',
    path: 'statistics',
    icon: <FaChartBar />,
  },
]
