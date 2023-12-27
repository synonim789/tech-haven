import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import { AdminProvider } from './context/AdminContext'
import { AuthProvider } from './context/AuthContext'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of f084b2c (convert AuthContext to react query)
=======
>>>>>>> parent of f084b2c (convert AuthContext to react query)
import { UserProvider } from './context/UserContext.jsx'
>>>>>>> parent of f084b2c (convert AuthContext to react query)
=======
>>>>>>> parent of 660b5ee (setup react query)
import { CartProvider } from './context/cart_context.jsx'
import { FilterProvider } from './context/filter_context.jsx'
import { ProductsProvider } from './context/products_context.jsx'
import { UserProvider } from './context/UserContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
<<<<<<< HEAD
<<<<<<< HEAD
  <AuthProvider>
    <UserProvider>
      <ProductsProvider>
=======
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
>>>>>>> parent of f084b2c (convert AuthContext to react query)
=======
  <AuthProvider>
    <UserProvider>
      <ProductsProvider>
>>>>>>> parent of 660b5ee (setup react query)
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
<<<<<<< HEAD
      </ProductsProvider>
    </UserProvider>
  </AuthProvider>
=======
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
>>>>>>> parent of f084b2c (convert AuthContext to react query)
=======
      </ProductsProvider>
    </UserProvider>
  </AuthProvider>
>>>>>>> parent of 660b5ee (setup react query)
)
