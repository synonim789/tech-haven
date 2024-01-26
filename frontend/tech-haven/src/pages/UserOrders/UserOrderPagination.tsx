type UserOrderPaginationProps = {
  currentPage: number
  numOfPages: number | undefined
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const UserOrderPagination = ({
  currentPage,
  numOfPages,
  setPage,
}: UserOrderPaginationProps) => {
  const pages = new Array(numOfPages).fill(null).map((v, i) => i)

  return (
    <div className="min-w-full flex justify-end gap-x-2 mt-5">
      {pages.map((page) => {
        return (
          <button
            onClick={() => setPage(page)}
            key={page}
            className={`${
              page === currentPage
                ? 'bg-[#405684] text-white'
                : 'bg-white dark:bg-transparent dark:border dark:border-slate-100 dark:text-slate-100'
            } py-2 px-4 rounded-sm font-semibold hover:scale-105 transition hover:opacity-90`}
          >
            {page + 1}
          </button>
        )
      })}
    </div>
  )
}
export default UserOrderPagination
