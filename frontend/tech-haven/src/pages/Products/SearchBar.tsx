import { useDispatch, useSelector } from 'react-redux'
import { updateFilter } from '../../features/products/filters'
import { RootState } from '../../store'
import { ChangeEvent } from 'react'

const SearchBar = () => {
  const filters = useSelector((state: RootState) => state.filters.filters)
  const dispatch = useDispatch()
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement> | null) => {
    if (event?.target instanceof HTMLInputElement) {
      const name = event.target.name
      const value = event.target.value
      dispatch(updateFilter({ name, value }))
    }
  }
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="p-4 w-4/5 overflow-hidden my-10 rounded-full text-2xl shadow-sm"
        name="search"
        value={filters.search}
        onChange={(e) => handleSearchChange(e)}
      />
    </div>
  )
}
export default SearchBar
