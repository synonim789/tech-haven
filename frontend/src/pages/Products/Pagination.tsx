import { useDispatch, useSelector } from 'react-redux'
import { updatePagination } from '../../features/products/filters'
import { RootState } from '../../store'

export const Pagination = () => {
  const filteredProducts = useSelector(
    (state: RootState) => state.filters.filteredProducts
  )
  const currentPage = useSelector(
    (state: RootState) => state.filters.currentPage
  )
  const dispatch = useDispatch()
  const limit = useSelector((state: RootState) => state.filters.limit)

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(filteredProducts.length / limit); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="my-8 flex items-center justify-center gap-5">
      {pageNumbers.map((number) => {
        return (
          <button
            onClick={(e) => {
              window.scroll({ top: 0, left: 0, behavior: 'smooth' })
              dispatch(updatePagination(e.currentTarget.textContent))
            }}
            className={
              number == currentPage
                ? 'size-[50px] scale-125 rounded-full  bg-[#405684] text-[20px] font-bold text-white shadow-xl'
                : 'size-[50px] rounded-full bg-white text-[20px] font-bold text-[#405684] shadow-xl dark:bg-slate-400'
            }
            key={number}
          >
            {number}
          </button>
        )
      })}
    </div>
  )
}
