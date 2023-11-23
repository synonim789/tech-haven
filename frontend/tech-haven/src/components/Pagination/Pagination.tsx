import { useFilterContext } from '../../context/filter_context'
import './Pagination.css'

export const Pagination = () => {
  const { filteredProducts, limit, updatePagination, currentPage } =
    useFilterContext()!

  let pageNumbers = []

  for (let i = 1; i <= Math.ceil(filteredProducts.length / limit); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => {
        return (
          <button
            onClick={updatePagination}
            className={
              number == currentPage
                ? 'pagination__number pagination__active'
                : 'pagination__number'
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
