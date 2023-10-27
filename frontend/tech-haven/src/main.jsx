import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FilterProvider } from './context/filter_context.jsx'
import { ProductsProvider } from './context/products_context.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductsProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </ProductsProvider>
)
