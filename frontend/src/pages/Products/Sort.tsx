import React from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetPaginaiton,
  setView,
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

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSort(e.currentTarget.value))
    dispatch(resetPaginaiton())
  }

  return (
    <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-end md:gap-5">
      <select
        name="sort"
        className="mb-3 rounded-2xl p-3 shadow-lg md:mb-0 dark:bg-[#575757] dark:text-white"
        onChange={handleSort}
      >
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
      </select>
      <button
        className={`hidden rounded-md p-1 text-3xl md:block ${
          gridView
            ? 'bg-[#405684] text-white'
            : 'border border-solid border-slate-100 dark:border-none dark:bg-slate-300'
        }`}
        onClick={() => dispatch(setView(true))}
      >
        <BsFillGridFill />
      </button>
      <button
        className={`hidden rounded-md p-1 text-3xl  md:block ${
          listView
            ? 'bg-[#405684] text-white'
            : 'border border-solid border-slate-100 bg-white dark:border-none dark:bg-slate-300'
        }`}
        onClick={() => dispatch(setView(false))}
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
