import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/cart_context.jsx'
import { FilterProvider } from './context/filter_context.jsx'
import { ProductsProvider } from './context/products_context.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProductsProvider>
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
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </AuthProvider>
)
