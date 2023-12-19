import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import { AdminProvider } from './context/AdminContext'
import { AuthContext2Provider } from './context/AuthContext2.tsx'
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/cart_context.jsx'
import { FilterProvider } from './context/filter_context.jsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthContext2Provider>
      <UserProvider>
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
      </UserProvider>
    </AuthContext2Provider>
  </QueryClientProvider>
)
