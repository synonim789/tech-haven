import { useFilterContext } from '../../context/filter_context'
import './Sort.css'

const Sort = () => {
  const { filteredProducts, updateSort } = useFilterContext()
  return (
    <div className="sort">
      <select name="sort" className="sort-input" onChange={updateSort}>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
      </select>
      <p className="sort__products-found">
        {filteredProducts.length} Products Found
      </p>
    </div>
  )
}
export default Sort
