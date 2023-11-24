import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import FullscreenLoading from './components/FullscreenLoading/FullscreenLoading'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { useAuthContext } from './context/AuthContext'
import { useUserContext } from './context/UserContext'
import ScrollToTop from './helpers/ScrollToTop'
import AboutPage from './pages/AboutPage/AboutPage'
import AdminPage from './pages/AdminPage/AdminPage'
import CartPage from './pages/CartPage/CartPage'
import ContactPage from './pages/ContactPage/ContactPage'
import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword'
import Homepage from './pages/Homepage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProductPage from './pages/ProductPage/ProductPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import UserChangeInfo from './pages/UserChangeInfo/UserChangeInfo'
import UserOrderPage from './pages/UserOrderPage/UserOrderPage'
import UserProfileInfo from './pages/UserProfileInfo/UserProfileInfo'
import UserSettingsPage from './pages/UserSettingsPage/UserSettingsPage'
import UserWelcomePage from './pages/UserWelcomePage/UserWelcomePage'
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
            <Route path="addProduct" />
            <Route path="products" />
            <Route path="removeProduct" />
            <Route path="editProduct" />
            <Route path="categories" />
            <Route path="addCategory" />
            <Route path="removeCategory" />
            <Route path="editCategory" />
            <Route path="users" />
            <Route path="addAdminUser" />
            <Route path="removeUser" />
            <Route path="statistics" />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
