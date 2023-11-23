import { BiSearchAlt } from 'react-icons/bi'
import { useFilterContext } from '../../context/filter_context'
import './SearchBar.css'

const SearchBar = () => {
  const { filters, updateFilters } = useFilterContext()!

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        className="search-bar__search"
        name="search"
        onChange={updateFilters}
        value={filters.search}
      />
      <button className="search-bar__button">
        <BiSearchAlt />
      </button>
    </div>
  )
}
export default SearchBar
