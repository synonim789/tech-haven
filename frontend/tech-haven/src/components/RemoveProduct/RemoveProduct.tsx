import './RemoveProduct.css'

const RemoveProduct = ({ product }) => {
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
      <button className="remove-product__delete">Delete Product</button>
    </section>
  )
}
export default RemoveProduct
