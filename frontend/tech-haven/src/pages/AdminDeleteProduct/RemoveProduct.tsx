import { useState } from 'react'
import { ProductType } from '../../types'
import RemoveProductModal from './RemoveProductModal'

type RemoveProductProps = {
  product: ProductType
  clear: () => void
}

const RemoveProduct = ({ product, clear }: RemoveProductProps) => {
  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <section className="mt-20 bg-white dark:bg-[#121212] rounded-xl shadow-xl w-[800px] p-12">
      <div className="flex items-center justify-between">
        <img
          src={product.image}
          alt={product.name}
          className="w-[250px] rounded-xl"
        />
        <h3 className="text-3xl font-bold dark:text-slate-600">
          {product.name}
        </h3>
        <p className="text-3xl font-bold text-[#405684]">{product.price}$</p>
      </div>
      <button
        className="px-6 py-3 text-2xl font-bold text-white bg-red-600 rounded-xl mt-10 transition-all hover:scale-105 hover:opacity-70"
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
