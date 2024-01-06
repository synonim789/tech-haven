import { ChangeEvent, useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilters, updateFilter } from '../../features/products/filters'
import { RootState } from '../../store'
import { ProductType } from '../../types'

type Props = {
  allProducts?: ProductType[]
}

const Filters = ({ allProducts }: Props) => {
  const [categories, setCategories] = useState<string[]>([])

  const [brands, setBrands] = useState<string[]>([])
  const filters = useSelector((state: RootState) => state.filters.filters)
  const dispatch = useDispatch()

  const getCategories = () => {
    let unique = allProducts?.map(
      (product: ProductType) => product['category'].name
    )
    setCategories(['all', ...new Set(unique)])
  }

  const getBrands = () => {
    let unique = allProducts?.map((product: ProductType) => product['brand'])
    setBrands(['all', ...new Set(unique)])
  }

  useEffect(() => {
    getCategories()
    getBrands()
  }, [allProducts])

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if ('target' in event) {
      let name = (event.target as HTMLInputElement | HTMLSelectElement).name
      let value = (event.target as HTMLInputElement | HTMLSelectElement).value
      if (name === 'category') {
        value = (event.target as HTMLButtonElement).textContent || ''
      }
      if (name === 'minPrice' || name === 'maxPrice') {
        value = value
      }

      if (name === 'brand') {
        value = (event.target as HTMLSelectElement).value
      }

      if (name === 'rating') {
        value = value
      }
      dispatch(updateFilter({ name, value }))
    }
  }

  return (
    <div className="bg-white h-full top-20  shadow-sm rounded-xl p-8 hidden lg:block">
      <p className="font-bold text-2xl mb-5">Category:</p>
      {categories.map((category, index) => {
        return (
          <button
            key={index}
            className={
              category === filters.category
                ? 'text-[18px] capitalize mb-2 block underline font-bold'
                : 'text-[18px] capitalize mb-2 block'
            }
            name="category"
            onClick={(e) => handleChange(e)}
          >
            {category}
          </button>
        )
      })}
      <p className="font-bold text-2xl mb-5 filters__brands">Brand:</p>
      <select
        name="brand"
        className="p-3 rounded-2xl capitalize cursor-pointer border border-solid border-slate-400"
        onChange={(e) => handleChange(e)}
      >
        {brands.map((brand, index) => {
          return (
            <option value={brand} key={index}>
              {brand}
            </option>
          )
        })}
      </select>
      <p className="font-bold text-2xl my-5 filters__price">Price:</p>
      <div>
        <label htmlFor="price1">From:</label>
        <input
          type="number"
          placeholder="From"
          className="w-full p-2 rounded-2xl capitalize cursor-pointer border border-solid border-slate-400"
          min={filters.minPrice}
          max={filters.maxPrice}
          id="price1"
          name="minPrice"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="price2">To:</label>
        <input
          type="number"
          placeholder="To"
          className="w-full p-2 rounded-2xl capitalize cursor-pointer border border-solid border-slate-400 mb-5"
          min={filters.minPrice}
          max={filters.maxPrice}
          id="price2"
          name="maxPrice"
          onChange={(e) => handleChange(e)}
        />
      </div>

      <p className="text-2xl font-bold mb-5">Rating:</p>
      <div>
        <div className="mb-2 flex items-center flex-row gap-1">
          <input
            type="radio"
            name="rating"
            id="rating5"
            checked={filters.rating === 5}
            value={5}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="rating5" className="flex flex-row items-center gap-1">
            5 <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
          </label>
        </div>
        <div className="mb-2 flex items-center flex-row gap-1">
          <input
            type="radio"
            name="rating"
            id="rating4"
            checked={filters.rating === 4}
            value={4}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="rating4" className="flex flex-row items-center gap-1">
            From 4 <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
          </label>
        </div>
        <div className="mb-2 flex items-center flex-row gap-1">
          <input
            type="radio"
            name="rating"
            id="rating3"
            checked={filters.rating === 3}
            value={3}
            onChange={(e) => handleChange(e)}
          />
          <label
            htmlFor="rating3"
            className=" flex items-center flex-row gap-1"
          >
            From 3 <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
          </label>
        </div>

        <div className="mb-2 flex items-center flex-row gap-1">
          <input
            type="radio"
            name="rating"
            id="rating2"
            checked={filters.rating === 2}
            value={2}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="rating2" className="flex flex-row items-center gap-1">
            From 2 <AiFillStar className="text-yellow-500" />
            <AiFillStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
          </label>
        </div>
        <div className="mb-2 flex items-center flex-row gap-1">
          <input
            type="radio"
            name="rating"
            id="rating1"
            checked={filters.rating === 1}
            value={1}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="rating1" className="flex flex-row items-center gap-1">
            From 1 <AiFillStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
            <AiOutlineStar className="text-yellow-500" />
          </label>
        </div>
        <button
          className="text-2xl font-bold text-[#120b90] mt-3 hover:underline"
          onClick={() => dispatch(clearFilters())}
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}
export default Filters
