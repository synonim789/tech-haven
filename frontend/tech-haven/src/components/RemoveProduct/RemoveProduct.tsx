import { useState } from 'react'
import { ProductType } from '../../types'
import RemoveProductModal from '../RemoveProductModal/RemoveProductModal'
import './RemoveProduct.css'

type RemoveProductProps = {
  product: ProductType
}

const RemoveProduct = ({ product }: RemoveProductProps) => {
  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <section className="remove-product">
      <div className="remove-product__container">
        <img
          src={product.image}
          alt={product.name}
          className="remove-product__image"
        />
        <h3>{product.name}</h3>
        <p>{product.price}$</p>
      </div>
      <button
        className="remove-product__delete"
        onClick={() => setOpenModal(true)}
      >
        Delete Product
      </button>
      {openModal && <RemoveProductModal close={closeModal} id={product.id} />}
    </section>
  )
}
export default RemoveProduct
