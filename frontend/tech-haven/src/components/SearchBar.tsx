import { useFilterContext } from '../context/filter_context'

const SearchBar = () => {
  const { filters, updateFilters } = useFilterContext()!

  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="p-4 w-4/5 overflow-hidden my-10 rounded-full text-2xl shadow-sm"
        name="search"
        onChange={updateFilters}
        value={filters.search}
      />
    </div>
  )
}
export default SearchBar
