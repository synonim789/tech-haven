import { useEffect, useState } from 'react'
import { useProductsContext } from '../../context/products_context'
import './Filters.css'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Filters = () => {
  const [categories, setCategories] = useState(['all'])
  const [brands, setBrands] = useState(['all'])
  const { products } = useProductsContext()

  const getCategories = () => {
    let unique = products.map((product) => product['category'].name)
    setCategories((oldCategories) => [...oldCategories, ...new Set(unique)])
  }

  const getBrands = () => {
    let unique = products.map((product) => product['brand'])
    setBrands((oldBrands) => [...oldBrands, ...new Set(unique)])
  }
  useEffect(() => {
    getCategories()
    getBrands()
  }, [products])

  return (
    <div className="filters">
      <p className="filters__title">Category:</p>
      {categories.map((category, index) => {
        return (
          <button key={index} className="filters__category">
            {category}
          </button>
        )
      })}
      <p className="filters__title filters__brands">Brand:</p>
      <select name="" id="" className="filters__brand">
        {brands.map((brand) => {
          return <option value={brand}>{brand}</option>
        })}
      </select>
      <p className="filters__title filters__price">Price:</p>
      <input
        type="number"
        placeholder="From"
        className="filters__price-input"
      />
      <input type="number" placeholder="To" className="filters__price-input" />
      <p className="filters__title filters__ratings">Rating:</p>
      <div className="filters__stars">
        <div className="filters__rating">
          <input type="radio" name="rating" id="rating5" />
          <label for="rating5">
            5 <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </label>
        </div>
        <div className="filters__rating">
          <input type="radio" name="rating" id="rating4" />
          <label for="rating4">
            From 4 <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </label>
        </div>
        <div className="filters__rating">
          <input type="radio" name="rating" id="rating3" />
          <label for="rating3">
            From 3 <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </label>
        </div>

        <div className="filters__rating">
          <input type="radio" name="rating" id="rating2" />
          <label for="rating2">
            From 2 <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </label>
        </div>
        <div className="filters__rating">
          <input type="radio" name="rating" id="rating1" />
          <label for="rating1">
            From 1 <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </label>
        </div>
      </div>
    </div>
  )
}
export default Filters
