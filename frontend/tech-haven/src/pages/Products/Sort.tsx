import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
  setGridView,
  setListView,
  updateSort,
} from '../../features/products/filters'
import { RootState } from '../../store'

const Sort = () => {
  const dispatch = useDispatch()
  const filteredProducts = useSelector(
    (state: RootState) => state.filters.filteredProducts
  )
  const listView = useSelector((state: RootState) => state.filters.listView)
  const gridView = useSelector((state: RootState) => state.filters.gridView)

  return (
    <div className="mb-5 flex md:justify-end md:gap-5 flex-col md:flex-row md:items-center">
      <select
        name="sort"
        className="p-3 rounded-2xl shadow-lg mb-3 md:mb-0 dark:bg-[#575757] dark:text-white"
        onChange={(e) => dispatch(updateSort(e.currentTarget.value))}
      >
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
      </select>
      <button
        className={`hidden md:block text-3xl p-1 rounded-md ${
          gridView
            ? 'text-white bg-[#405684]'
            : 'dark:bg-slate-300 dark:border-none border border-solid border-slate-100'
        }`}
        onClick={() => dispatch(setGridView())}
      >
        <BsFillGridFill />
      </button>
      <button
        className={`hidden md:block text-3xl p-1  rounded-md ${
          listView
            ? 'text-white bg-[#405684]'
            : 'bg-white dark:bg-slate-300 dark:border-none border border-solid border-slate-100'
        }`}
        onClick={() => dispatch(setListView())}
      >
        <AiOutlineUnorderedList />
      </button>

      <p className="text-[20px] font-bold dark:text-slate-300">
        {filteredProducts.length} Products Found
      </p>
    </div>
  )
}
export default Sort
