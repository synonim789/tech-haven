import SingleProduct from '../../components/SingleProduct/SingleProduct'
import { useProductsContext } from '../../context/products_context'
import './ProductsPage.css'

const ProductsPage = () => {
  const { products } = useProductsContext()
  console.log(products)
  return (
    <section className="products-page">
      <input
        type="text"
        placeholder="search"
        className="products-page__search"
      />
      <div className="products-page__content">
        <div className="products-page__filters">
          <p>trigo[earthbpuiaesrgtbpuewipubgtoihnsortino</p>
        </div>
        <div className="products-page__products">
          {products.map((product) => {
            return <SingleProduct key={product.id} {...product} />
          })}
        </div>
      </div>
    </section>
  )
}
export default ProductsPage
