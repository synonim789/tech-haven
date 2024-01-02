import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import { AdminProvider } from './context/AdminContext'
import './index.css'
import { store } from './store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AdminProvider>
    <Provider store={store}>
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
    </Provider>
  </AdminProvider>
)
