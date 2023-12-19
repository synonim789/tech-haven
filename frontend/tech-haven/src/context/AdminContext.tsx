import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import { useGetAllProducts } from '../features/products/useGetAllProducts'
import AdminReducer from '../reducer/AdminReducer'
import { CategoryType, ChildrenType, UserType } from '../types'
import { customFetch } from '../utils/customFetch'
import { decodeToken } from '../utils/decodeToken'
import { useAuthContext2 } from './AuthContext2'

type AdminContextState = {
  categories: Array<CategoryType>
  categoryLoading: boolean
  categoryError: boolean | string
  getCategories: () => void
  addProduct: (data: AddProductData) => void
  deleteProduct: ({ id, token }: DeleteProduct) => void
  editProduct: (data: editProductDataType) => void
  addCategory: (data: addCategoryDataType) => void
  deleteCategory: ({ id, token }: DeleteCategory) => void
  editCategory: ({ id, token, name }: EditCategory) => void
  getAllUsers: ({ token }: GetAllUsers) => void
  changeUserRole: ({ id, token }: ChangeUserRole) => void
  addProductError: boolean | string
  addProductLoading: boolean
  addProductSuccess: boolean
  deleteProductSuccess: boolean
  editProductSuccess: boolean
  editProductLoading: boolean
  editProductError: boolean | string
  addCategoryLoading: boolean
  addCategoryError: boolean | string
  addCategorySuccess: boolean
  deleteCategoryLoading: boolean
  deleteCategoryError: boolean | string
  deleteCategorySuccess: boolean | null
  editCategoryError: boolean | string
  editCategorySuccess: boolean
  editCategoryLoading: boolean
  getAllUsersError: boolean | string
  getAllUsersLoading: boolean
  getAllUsersSuccess: boolean
  allUsers?: Array<UserType>
  changeUserRoleSuccess: boolean
  changeUserRoleLoading: boolean
  changeUserRoleError: boolean | string
}

type AddProductData = {
  token: {
    token: string
  }
  name: string
  description: string
  brand: string
  category: string
  price: number
  stock: number
  rating: number
  revCount: number
  isFeatured: boolean
  image: File[]
  images: File[]
}

type editProductDataType = {
  token: string
  name: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  isFeatured: boolean
  id: string
}

type addCategoryDataType = {
  token: string
  category: string
}

type DeleteProduct = {
  id: string
  token: string | null
}

type DeleteCategory = {
  id: string
  token: string | null
}

type GetAllUsers = {
  token: string | null
}

type EditCategory = {
  name: string
  token: string | null
  id: string
}

type ChangeUserRole = {
  token: string | null
  id: string
}

const AdminContext = createContext<AdminContextState | null>(null)

const initialState = {
  categories: [],
  categoryLoading: false,
  categoryError: false,
  addProductLoading: false,
  addProductError: false,
  addProductSuccess: false,
  deleteProductLoading: false,
  deleteProductError: false,
  deleteProductSuccess: false,
  editProductLoading: false,
  editProductError: false,
  editProductSuccess: false,
  addCategoryLoading: false,
  addCategoryError: false,
  addCategorySuccess: false,
  deleteCategoryLoading: false,
  deleteCategoryError: false,
  deleteCategorySuccess: false,
  editCategorySuccess: false,
  editCategoryError: false,
  editCategoryLoading: false,
  getAllUsersLoading: false,
  getAllUsersSuccess: false,
  getAllUsersError: false,
  allUsers: null,
  changeUserRoleLoading: false,
  changeUserRoleError: false,
  changeUserRoleSuccess: false,
}

export const AdminProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState)
  const { data } = useGetAllProducts()
  const { logoutUserInContext } = useAuthContext2()!

  useEffect(() => {}, [
    state.addProductSuccess,
    state.deleteProductSuccess,
    state.editProductSuccess,
  ])

  const getCategories = async () => {
    dispatch({ type: 'GET_CATEGORIES_START' })
    try {
      const response = await customFetch.get('/categories')
      dispatch({ type: 'GET_CATEGORIES_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'GET_CATEGORIES_ERROR' })
    }
  }

  const addProduct = async (data: AddProductData) => {
    const formData: any = new FormData()
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i])
    }
    formData.append('image', data.image[0])
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('brand', data.brand)
    formData.append('category', data.category)
    formData.append('price', data.price)
    formData.append('countInStock', data.stock)
    formData.append('rating', data.rating)
    formData.append('numReviews', data.revCount)
    formData.append('isFeatured', data.isFeatured)
    const { token } = data

    dispatch({ type: 'ADD_PRODUCT_START' })
    try {
      await customFetch
        .post('/products/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          dispatch({ type: 'ADD_PRODUCT_SUCCESS' })
          toast.success('Product Added Successfully')
        })
    } catch (error: any) {
      dispatch({
        type: 'ADD_PRODUCT_ERROR',
        payload: error?.response?.data?.message,
      })
    }
  }

  const deleteProduct = async ({ id, token }: DeleteProduct) => {
    dispatch({ type: 'DELETE_PRODUCT_START' })
    try {
      await customFetch.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      dispatch({ type: 'DELETE_PRODUCT_SUCCESS' })
      toast.success('Product Successfully Deleted')
    } catch (err: any) {
      dispatch({
        type: 'DELETE_PRODUCT_ERROR',
        payload: err?.response?.data?.message,
      })
    }
  }

  const editProduct = async (data: editProductDataType) => {
    const {
      brand,
      category,
      countInStock,
      description,
      id,
      isFeatured,
      name,
      numReviews,
      price,
      rating,
      token,
    } = data

    dispatch({ type: 'EDIT_PRODUCT_START' })
    try {
      await customFetch.put(
        `/products/${id}`,
        {
          brand,
          category,
          countInStock,
          description,
          isFeatured,
          name,
          numReviews,
          price,
          rating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      dispatch({ type: 'EDIT_PRODUCT_SUCCESS' })
    } catch (error: any) {
      dispatch({
        type: 'EDIT_PRODUCT_ERROR',
        payload: error?.response?.data?.message,
      })
    }
  }

  const addCategory = async ({ category, token }: addCategoryDataType) => {
    dispatch({ type: 'ADD_CATEGORY_START' })
    try {
      await customFetch.post(
        '/categories',
        { name: category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({ type: 'ADD_CATEGORY_SUCCESS' })

      toast.success('Category Added Successfully')
    } catch (error: any) {
      dispatch({
        type: 'ADD_CATEGORY_ERROR',
        payload: error.response.data.message,
      })
    }
  }

  const deleteCategory = async ({ id, token }: DeleteCategory) => {
    dispatch({ type: 'DELETE_CATEGORY_START' })
    try {
      await customFetch.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: 'DELETE_CATEGORY_SUCCESS' })
      toast.success('Category Deleted Successfully')
    } catch (error: any) {
      dispatch({
        type: 'DELETE_CATEGORY_ERROR',
        payload: error.response.data.message,
      })
    }
  }

  const editCategory = async ({ id, name, token }: EditCategory) => {
    dispatch({ type: 'EDIT_CATEGORY_START' })
    try {
      await customFetch.put(
        `/categories/${id}`,
        { name: name },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      dispatch({ type: 'EDIT_CATEGORY_SUCCESS' })
      toast.success('Category edited successfully')
    } catch (error: any) {
      dispatch({
        type: 'EDIT_CATEGORY_ERROR',
        payload: error.response.data.message,
      })
    }
  }

  const getAllUsers = async ({ token }: GetAllUsers) => {
    dispatch({ type: 'GET_ALL_USERS_START' })
    try {
      const response = await customFetch.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: response.data })
    } catch (error: any) {
      dispatch({
        type: 'GET_ALL_USERS_ERROR',
        payload: error.response.data.message,
      })
    }
  }

  const changeUserRole = async ({ id, token }: ChangeUserRole) => {
    dispatch({ type: 'CHANGE_USER_ROLE_START' })
    const { userId } = decodeToken(token)

    try {
      await customFetch.put(`/users/change-role/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch({ type: 'CHANGE_USER_ROLE_SUCCESS' })
      await getAllUsers({ token: token })
      toast.success('User Role changed Successfully')
      if (userId === id) {
        logoutUserInContext()
      }
    } catch (error: any) {
      dispatch({
        type: 'CHANGE_USER_ROLE_ERROR',
        payload: error.response.data.message,
      })
    }
  }

  return (
    <AdminContext.Provider
      value={{
        ...state,
        getCategories,
        addProduct,
        deleteProduct,
        editProduct,
        addCategory,
        deleteCategory,
        editCategory,
        getAllUsers,
        changeUserRole,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(AdminContext)
}
