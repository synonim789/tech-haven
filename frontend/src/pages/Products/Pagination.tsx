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

  let pageNumbers = []

  for (let i = 1; i <= Math.ceil(filteredProducts.length / limit); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center items-center my-8 gap-5">
      {pageNumbers.map((number) => {
        return (
          <button
            onClick={(e) => {
              window.scroll({ top: 0, left: 0, behavior: 'smooth' })
              dispatch(updatePagination(e.currentTarget.textContent))
            }}
            className={
              number == currentPage
                ? 'w-[50px] h-[50px] bg-[#405684]  rounded-full text-white font-bold text-[20px] shadow-xl scale-125'
                : 'w-[50px] h-[50px] bg-white dark:bg-slate-400 rounded-full text-[#405684] font-bold text-[20px] shadow-xl'
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
