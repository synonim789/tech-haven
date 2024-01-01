import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import { AdminProvider } from './context/AdminContext'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/cart_context.jsx'
import './index.css'
import { store } from './store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <UserProvider>
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
          <Provider store={store}>
            <App />
          </Provider>
        </AdminProvider>
      </CartProvider>
    </UserProvider>
  </AuthProvider>
)
