import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import FullscreenLoading from './components/ui/FullscreenLoading'
import { countCartTotal } from './features/cart/cart'
import { useGetUserQuery } from './features/user/userApiSlice'
import { setUser } from './features/user/userSlice'
import ScrollToTop from './helpers/ScrollToTop'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Navbar from './layout/Navbar'
import AboutPage from './pages/About/AboutPage'
import AddCategory from './pages/AdminAddCategory/AddCategory'
import AddProductPage from './pages/AdminAddProduct/AddProductPage'
import RemoveCategoryPage from './pages/AdminDeleteCategory/RemoveCategoryPage'
import RemoveProductPage from './pages/AdminDeleteProduct/RemoveProductPage'
import RemoveUserPage from './pages/AdminDeleteUser/RemoveUserPage'
import EditCategoryPage from './pages/AdminEditCategory/EditCategoryPage'
import EdictProductPage from './pages/AdminEditProduct/EditProductPage'
import EditUserRole from './pages/AdminEditUserRole/EditUserRolePage'
import AdminPage from './pages/AdminPage/AdminPage'
import AdminWelcomePage from './pages/AdminWelcome/AdminWelcomePage'
import CartPage from './pages/Cart/CartPage'
import ContactPage from './pages/Contact/ContactPage'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Homepage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import OrderInfoPage from './pages/OrderInfo/OrderInfoPage'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import OrderSummary from './pages/OrderSummary/OrderSummary'
import ProductPage from './pages/Product/ProductPage'
import ProductsPage from './pages/Products/ProductsPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import SingleOrder from './pages/SingleOrder/SingleOrder'
import UserChangeInfo from './pages/UserChangeInfo/UserChangeInfo'
import UserProfileInfo from './pages/UserInfo/UserProfileInfo'
import UserOrderPage from './pages/UserOrders/UserOrderPage'
import ProfilePage from './pages/UserPage/ProfilePage'
import UserSettingsPage from './pages/UserSettings/UserSettingsPage'
import UserWelcomePage from './pages/UserWelcome/UserWelcomePage'
import AdminRoute from './routes/AdminRoute'
import AuthRoute from './routes/AuthRoute'
import GuestRoute from './routes/GuestRoute'
import { RootState } from './store'
import { decodeToken } from './utils/decodeToken'

function App() {
  const token = useSelector((state: RootState) => state.auth.token)
  const decodedToken = token ? decodeToken(token) : null
  const cart = useSelector((state: RootState) => state.cart.cart)
  const dispatch = useDispatch()
  const { data, isLoading } = useGetUserQuery(
    { id: decodedToken?.userId },
    { skip: !token }
  )
  useEffect(() => {
    if (token) {
      dispatch(setUser(data))
    }
  }, [data, token])

  useEffect(() => {
    dispatch(countCartTotal())
  }, [cart])

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <GuestRoute>
                <SignUpPage />
              </GuestRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
            }
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <ProfilePage />
              </AuthRoute>
            }
          >
            <Route index element={<UserWelcomePage />} />
            <Route path="info" element={<UserProfileInfo />} />
            <Route path="orders" element={<UserOrderPage />} />
            <Route path="settings" element={<UserSettingsPage />} />
            <Route path="settings/update" element={<UserChangeInfo />} />
            <Route path="orders/:id" element={<SingleOrder />} />
          </Route>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          >
            <Route index element={<AdminWelcomePage />} />
            <Route path="addProduct" element={<AddProductPage />} />
            <Route
              path="products"
              element={
                <div>
                  <h2 className="text-6xl font-bold text-slate-600">
                    Products
                  </h2>
                </div>
              }
            />
            <Route path="removeProduct" element={<RemoveProductPage />} />
            <Route path="editProduct" element={<EdictProductPage />} />
            <Route
              path="categories"
              element={
                <div>
                  <h2 className="text-6xl font-bold text-slate-600">
                    Categories
                  </h2>
                </div>
              }
            />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="removeCategory" element={<RemoveCategoryPage />} />
            <Route path="editCategory" element={<EditCategoryPage />} />
            <Route
              path="users"
              element={
                <div>
                  <h2 className="text-6xl font-bold text-slate-600">Users</h2>
                </div>
              }
            />
            <Route path="editUserRole" element={<EditUserRole />} />
            <Route path="removeUser" element={<RemoveUserPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/order/info"
            element={
              <AuthRoute>
                <OrderInfoPage />
              </AuthRoute>
            }
          />
          <Route
            path="/order/summary"
            element={
              <AuthRoute>
                <OrderSummary />
              </AuthRoute>
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
