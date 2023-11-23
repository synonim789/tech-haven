import { useFilterContext } from '../../context/filter_context'
import { BsFillGridFill } from 'react-icons/bs'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import './Sort.css'

const Sort = () => {
  const {
    filteredProducts,
    updateSort,
    setGridView,
    setListView,
    gridView,
    listView,
  } = useFilterContext()!

  return (
    <div className="sort">
      <div className="sort__left">
        <select name="sort" className="sort-input" onChange={updateSort}>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="price-asc">Price Ascending</option>
          <option value="price-desc">Price Descending</option>
        </select>
        <div className="sort__views">
          <button
            className={`sort__grid ${gridView ? 'sort__grid--active' : ''}`}
            onClick={setGridView}
          >
            <BsFillGridFill />
          </button>
          <button
            className={`sort__list ${listView ? 'sort__grid--active' : ''}`}
            onClick={setListView}
          >
            <AiOutlineUnorderedList />
          </button>
        </div>
      </div>

      <p className="sort__products-found">
        {filteredProducts.length} Products Found
      </p>
    </div>
  )
}
export default Sort
