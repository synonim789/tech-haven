import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import { AdminProvider } from './context/AdminContext'
import { AuthProvider } from './context/AuthContext'
<<<<<<< HEAD
=======
import { UserProvider } from './context/UserContext.jsx'
>>>>>>> parent of f084b2c (convert AuthContext to react query)
import { CartProvider } from './context/cart_context.jsx'
import { FilterProvider } from './context/filter_context.jsx'
import { ProductsProvider } from './context/products_context.jsx'
import { UserProvider } from './context/UserContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
<<<<<<< HEAD
  <AuthProvider>
    <UserProvider>
      <ProductsProvider>
=======
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
>>>>>>> parent of f084b2c (convert AuthContext to react query)
        <FilterProvider>
          <CartProvider>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              toastClassName="toast-fontSize"
            />
            <AdminProvider>
              <App />
            </AdminProvider>
          </CartProvider>
        </FilterProvider>
<<<<<<< HEAD
      </ProductsProvider>
    </UserProvider>
  </AuthProvider>
=======
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
>>>>>>> parent of f084b2c (convert AuthContext to react query)
)
