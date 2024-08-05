type Props = {
  currentPage: number
  numOfPages: number | undefined
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const OrderPagination = ({ currentPage, numOfPages, setPage }: Props) => {
  const pages = new Array(numOfPages).fill(null).map((_, i) => i)

  return (
    <div className="mt-5 flex min-w-full justify-end gap-x-2">
      {pages.map((page) => {
        return (
          <button
            onClick={() => {
              window.scroll({ top: 0, left: 0, behavior: 'smooth' })
              setPage(page)
            }}
            key={page}
            className={`${
              page === currentPage
                ? 'bg-[#405684] text-white'
                : 'bg-white dark:border dark:border-slate-100 dark:bg-transparent dark:text-slate-100'
            } rounded-sm px-4 py-2 font-semibold transition hover:scale-105 hover:opacity-90`}
          >
            {page + 1}
          </button>
        )
      })}
    </div>
  )
}
export default OrderPagination
