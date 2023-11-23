import { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useFilterContext } from '../../context/filter_context'
import { ProductType } from '../../types'
import './Filters.css'

const Filters = () => {
  const [categories, setCategories] = useState<string[]>([])

  const [brands, setBrands] = useState<string[]>([])

  const { filters, updateFilters, allProducts, clearFilters } =
    useFilterContext()!

  const getCategories = () => {
    let unique = allProducts.map(
      (product: ProductType) => product['category'].name
    )
    setCategories(['all', ...new Set(unique)])
  }

  const getBrands = () => {
    let unique = allProducts.map((product: ProductType) => product['brand'])
    setBrands(['all', ...new Set(unique)])
  }

  useEffect(() => {
    getCategories()
    getBrands()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts])

  return (
    <div className="filters">
      <p className="filters__title">Category:</p>
      {categories.map((category, index) => {
        return (
          <button
            key={index}
            className={
              category === filters.category
                ? 'filters__category active-category'
                : 'filters__category'
            }
            name="category"
            onClick={updateFilters}
          >
            {category}
          </button>
        )
      })}
      <p className="filters__title filters__brands">Brand:</p>
      <select name="brand" className="filters__brand" onChange={updateFilters}>
        {brands.map((brand, index) => {
          return (
            <option value={brand} key={index}>
              {brand}
            </option>
          )
        })}
      </select>
      <p className="filters__title filters__price">Price:</p>
      <label htmlFor="price1">From:</label>
      <input
        type="number"
        placeholder="From"
        className="filters__price-input"
        min={filters.minPrice}
        max={filters.maxPrice}
        id="price1"
        name="minPrice"
        onChange={updateFilters}
      />
      <label htmlFor="price2">To:</label>
      <input
        type="number"
        placeholder="To"
        className="filters__price-input"
        min={filters.minPrice}
        max={filters.maxPrice}
        id="price2"
        name="maxPrice"
        onChange={updateFilters}
      />
      <p className="filters__title filters__ratings">Rating:</p>
      <div className="filters__stars">
        <div className="filters__rating">
          <input
            type="radio"
            name="rating"
            id="rating5"
            checked={filters.rating === 5}
            value={5}
            onChange={updateFilters}
          />
          <label htmlFor="rating5">
            5 <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </label>
        </div>
        <div className="filters__rating">
          <input
            type="radio"
            name="rating"
            id="rating4"
            checked={filters.rating === 4}
            value={4}
            onChange={updateFilters}
          />
          <label htmlFor="rating4">
            From 4 <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </label>
        </div>
        <div className="filters__rating">
          <input
            type="radio"
            name="rating"
            id="rating3"
            checked={filters.rating === 3}
            value={3}
            onChange={updateFilters}
          />
          <label htmlFor="rating3">
            From 3 <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </label>
        </div>

        <div className="filters__rating">
          <input
            type="radio"
            name="rating"
            id="rating2"
            checked={filters.rating === 2}
            value={2}
            onChange={updateFilters}
          />
          <label htmlFor="rating2">
            From 2 <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </label>
        </div>
        <div className="filters__rating">
          <input
            type="radio"
            name="rating"
            id="rating1"
            checked={filters.rating === 1}
            value={1}
            onChange={updateFilters}
          />
          <label htmlFor="rating1">
            From 1 <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </label>
        </div>
        <button className="filters__clear" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  )
}
export default Filters
