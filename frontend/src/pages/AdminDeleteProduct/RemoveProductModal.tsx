import { useDeleteProductMutation } from '../../features/adminProducts/adminProductsApiSlice'

type Props = {
  close: () => void
  clear: () => void
  id: string
}

const RemoveProductModal = ({ close, id, clear }: Props) => {
  const [deleteProduct] = useDeleteProductMutation()
  
  return (
    <>
      <div className="fixed inset-0  z-40 bg-neutral-400 opacity-40" />
      <div className="fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-white z-50 p-14 flex flex-col items-center gap-14 rounded-3xl dark:bg-[#222427] text-slate-500">
        <h3 className="text-3xl font-bold">
          Do you really want to delete this product?
        </h3>
        <div className="flex gap-14">
          <button
            className="px-4 py-2 text-[20px] font-bold text-white bg-green-700 rounded-xl hover:scale-105 hover:opacity-75"
            onClick={() => {
              deleteProduct(id)
              close()
              clear()
            }}
          >
            Yes, I do
          </button>
          <button
            className="px-4 py-2 text-[20px] font-bold text-white bg-red-500 rounded-xl hover:scale-105 hover:opacity-75"
            onClick={close}
          >
            No, I don&apos;t
          </button>
        </div>
      </div>
    </>
  )
}
export default RemoveProductModal
