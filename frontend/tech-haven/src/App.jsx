import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import { useUserContext } from './context/UserContext'
import AboutPage from './pages/AboutPage/AboutPage'
import CartPage from './pages/CartPage/CartPage'
import ContactPage from './pages/ContactPage/ContactPage'
import Homepage from './pages/Homepage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProductPage from './pages/ProductPage/ProductPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

function App() {
  const { user } = useUserContext()
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
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          ></Route>
          <Route exact path="/register" element={<RegisterPage />}></Route>
          <Route exact path="/products" element={<ProductsPage />}></Route>
          <Route exact path="/about" element={<AboutPage />}></Route>
          <Route exact path="/contact" element={<ContactPage />}></Route>
          <Route exact path="/cart" element={<CartPage />}></Route>
          <Route exact path="/products/:id" element={<ProductPage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
