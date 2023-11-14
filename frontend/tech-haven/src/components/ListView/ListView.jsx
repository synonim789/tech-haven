import { Link } from 'react-router-dom'
import { useFilterContext } from '../../context/filter_context'
import './ListView.css'

const ListView = () => {
  const { pagedProducts: products } = useFilterContext()

  return (
    <div className="list-view">
      {products.map((product, index) => {
        return (
          <div className="list-view__product" key={index}>
            <h2 className="list-view__title">{product.name}</h2>
            <div className="list-view__all">
              <div className="list-view__image-container">
                <img src={product.image} alt="" className="list-view__image" />
              </div>

              <div className="list-view__product-content">
                <h5 className="list-view__price">${product.price}</h5>
                <p className="list-view__description">
                  {product.description.substring(0, 125)}...
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="list-view__link"
                >
                  Go To Product
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default ListView
