import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import FullscreenLoading from './components/FullscreenLoading'
import Header from './components/Header'
import Navbar from './components/Navbar'
import { useAuthContext } from './context/AuthContext'
import { useUserContext } from './context/UserContext'
import ScrollToTop from './helpers/ScrollToTop'
import AboutPage from './pages/AboutPage'
import AddCategory from './pages/AddCategory'
import AddProductPage from './pages/AddProductPage'
import AddUserPage from './pages/AddUserPage'
import AdminPage from './pages/AdminPage'
import AdminWelcomePage from './pages/AdminWelcomePage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import EdictProductPage from './pages/EdictProductPage'
import EditCategoryPage from './pages/EditCategoryPage'
import ForgotPassword from './pages/ForgotPassword'
import Homepage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductPage from './pages/ProductPage'
import ProductsPage from './pages/ProductsPage'
import ProfilePage from './pages/ProfilePage'
import RemoveCategoryPage from './pages/RemoveCategoryPage'
import RemoveProductPage from './pages/RemoveProductPage'
import RemoveUserPage from './pages/RemoveUserPage'
import SignUpPage from './pages/SignUpPage'
import StatisticsPage from './pages/StatisticsPage'
import UserChangeInfo from './pages/UserChangeInfo'
import UserOrderPage from './pages/UserOrderPage'
import UserProfileInfo from './pages/UserProfileInfo'
import UserSettingsPage from './pages/UserSettingsPage'
import UserWelcomePage from './pages/UserWelcomePage'
import AdminRoute from './routes/AdminRoute'
import AuthRoute from './routes/AuthRoute'
import GuestRoute from './routes/GuestRoute'

function App() {
  const { token } = useAuthContext()!
  const { getUser, clearUser, userLoading } = useUserContext()!
  useEffect(() => {
    if (token) {
      getUser(token)
    } else {
      clearUser()
    }
  }, [token])

  if (userLoading) {
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
            <Route path="addAdminUser" element={<AddUserPage />} />
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
