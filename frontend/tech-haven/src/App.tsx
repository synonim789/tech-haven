import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import FullscreenLoading from './components/ui/FullscreenLoading'
import { useAuthContext } from './context/AuthContext'
import { useUserContext } from './context/UserContext'
import { useProductsContext } from './context/products_context'
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
import StatisticsPage from './pages/AdminStatistics/StatisticsPage'
import AdminWelcomePage from './pages/AdminWelcome/AdminWelcomePage'
import CartPage from './pages/Cart/CartPage'
import ContactPage from './pages/Contact/ContactPage'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Homepage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import ProductPage from './pages/Product/ProductPage'
import ProductsPage from './pages/Products/ProductsPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import UserChangeInfo from './pages/UserChangeInfo/UserChangeInfo'
import UserProfileInfo from './pages/UserInfo/UserProfileInfo'
import UserOrderPage from './pages/UserOrders/UserOrderPage'
import ProfilePage from './pages/UserPage/ProfilePage'
import UserSettingsPage from './pages/UserSettings/UserSettingsPage'
import UserWelcomePage from './pages/UserWelcome/UserWelcomePage'
import AdminRoute from './routes/AdminRoute'
import AuthRoute from './routes/AuthRoute'
import GuestRoute from './routes/GuestRoute'

function App() {
  const { token } = useAuthContext()!
  const { getUser, clearUser, userLoading } = useUserContext()!

  const { productsLoading } = useProductsContext()!

  useEffect(() => {
    if (token) {
      getUser(token)
    } else {
      clearUser()
    }
  }, [token])

  if (userLoading || productsLoading) {
    return <FullscreenLoading />
  }
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <GuestRoute>
                <SignUpPage />
              </GuestRoute>
            }
          ></Route>
          <Route
            path="/forgot-password"
            element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
            }
          ></Route>
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/products/:id" element={<ProductPage />}></Route>
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
                  <h1 className="text-6xl font-bold">Products</h1>
                </div>
              }
            />
            <Route path="removeProduct" element={<RemoveProductPage />} />
            <Route path="editProduct" element={<EdictProductPage />} />
            <Route
              path="categories"
              element={
                <div>
                  <h1 className="text-6xl font-bold">Categories</h1>
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
                  <h1 className="text-6xl font-bold">Users</h1>
                </div>
              }
            />
            <Route path="editUserRole" element={<EditUserRole />} />
            <Route path="removeUser" element={<RemoveUserPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
