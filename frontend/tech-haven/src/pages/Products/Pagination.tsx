import { useFilterContext } from '../../context/filter_context'

export const Pagination = () => {
  const { filteredProducts, limit, updatePagination, currentPage } =
    useFilterContext()!

  let pageNumbers = []

  for (let i = 1; i <= Math.ceil(filteredProducts.length / limit); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center items-center my-8 gap-5">
      {pageNumbers.map((number) => {
        return (
          <button
            onClick={updatePagination}
            className={
              number == currentPage
                ? 'w-[50px] h-[50px] bg-[#120b90] border border-solid border-slate-200 rounded-full text-white font-bold text-[20px]'
                : 'w-[50px] h-[50px] bg-white rounded-full text-[#120b90] font-bold text-[20px]'
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
