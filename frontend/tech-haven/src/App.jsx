import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { useAuthContext } from './context/AuthContext'
import AboutPage from './pages/AboutPage/AboutPage'
import CartPage from './pages/CartPage/CartPage'
import ContactPage from './pages/ContactPage/ContactPage'
import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword'
import Homepage from './pages/Homepage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProductPage from './pages/ProductPage/ProductPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SignUpPage from './pages/SignUpPage/SignUpPage'

function App() {
  const { token } = useAuthContext()
  return (
    <>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route
            exact
            path="/login"
            element={!token ? <LoginPage /> : <Navigate to="/" />}
          ></Route>
          <Route
            exact
            path="/sign-up"
            element={!token ? <SignUpPage /> : <Navigate to="/" />}
          ></Route>
          <Route
            exact
            path="/forgot-password"
            element={!token ? <ForgotPassword /> : <Navigate to="/" />}
          ></Route>
          <Route exact path="/products" element={<ProductsPage />}></Route>
          <Route exact path="/about" element={<AboutPage />}></Route>
          <Route exact path="/contact" element={<ContactPage />}></Route>
          <Route exact path="/cart" element={<CartPage />}></Route>
          <Route exact path="/products/:id" element={<ProductPage />}></Route>
          <Route
            exact
            path="/profile"
            element={token ? <ProfilePage /> : <Navigate to="/login" />}
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
