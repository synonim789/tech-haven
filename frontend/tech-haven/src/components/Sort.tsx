import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { useFilterContext } from '../context/filter_context'

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
    <div className="mb-5 flex justify-end items-center gap-5">
      <select
        name="sort"
        className="p-3 rounded-full shadow-md"
        onChange={updateSort}
      >
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
      </select>
      <button
        className={`text-3xl p-1  rounded-md ${
          gridView
            ? 'text-white bg-[#120b90]'
            : 'bg-white border border-solid border-slate-100'
        }`}
        onClick={setGridView}
      >
        <BsFillGridFill />
      </button>
      <button
        className={`text-3xl p-1  rounded-md ${
          listView
            ? 'text-white bg-[#120b90]'
            : 'bg-white border border-solid border-slate-100'
        }`}
        onClick={setListView}
      >
        <AiOutlineUnorderedList />
      </button>

      <p className="text-[20px] font-bold">
        {filteredProducts.length} Products Found
      </p>
    </div>
  )
}
export default Sort
