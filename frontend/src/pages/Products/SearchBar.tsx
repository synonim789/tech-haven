import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPaginaiton, updateFilter } from '../../features/products/filters'
import { RootState } from '../../store'

const SearchBar = () => {
  const filters = useSelector((state: RootState) => state.filters.filters)
  const dispatch = useDispatch()
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement> | null) => {
    if (event?.target instanceof HTMLInputElement) {
      const name = event.target.name
      const value = event.target.value
      dispatch(updateFilter({ name, value }))
      dispatch(resetPaginaiton())
    }
  }
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="p-4 w-full overflow-hidden my-10 rounded-full text-2xl shadow-lg lg:w-3/4 dark:bg-[#575757] dark:text-white placeholder:text-white"
        name="search"
        value={filters.search}
        onChange={(e) => handleSearchChange(e)}
      />
    </div>
  )
}
export default SearchBar
