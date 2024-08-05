import { useState } from 'react'
import { ProductType } from '../../types'
import { formatPrice } from '../../utils/formatPrice'
import RemoveProductModal from './RemoveProductModal'

type Props = {
  product: ProductType
  clear: () => void
}

const RemoveProduct = ({ product, clear }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <section className="mt-20 w-full rounded-xl bg-white p-12 shadow-xl dark:bg-[#222427]">
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="w-[250px] rounded-xl"
        />
        <h3 className="text-3xl font-bold dark:text-slate-600">
          {product.name}
        </h3>
        <p className="text-3xl font-bold text-[#405684]">
          {formatPrice(product.price)}
        </p>
      </div>
      <button
        className="mt-10 rounded-xl bg-red-500 px-6 py-3 text-2xl font-bold text-white transition-all hover:scale-105 hover:opacity-70"
        onClick={() => setOpenModal(true)}
      >
        Delete Product
      </button>
      {openModal && (
        <RemoveProductModal close={closeModal} id={product._id} clear={clear} />
      )}
    </section>
  )
}
export default RemoveProduct
