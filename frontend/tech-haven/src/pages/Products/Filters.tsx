import { ChangeEvent, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'react-use'
import { clearFilters, updateFilter } from '../../features/products/filters'
import { RootState } from '../../store'
import { ProductType } from '../../types'
import FilterRating from './FilterRating'

type Props = {
  allProducts?: ProductType[]
}

const Filters = ({ allProducts }: Props) => {
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [filtersVisibility, setFiltersVisibility] = useState(true)
  const filters = useSelector((state: RootState) => state.filters.filters)
  const dispatch = useDispatch()
  const { width } = useWindowSize()

  useEffect(() => {
    if (allProducts) {
      const uniqueCategories = new Set(
        allProducts?.map((product) => product.category.name)
      )
      const uniqueBrands = new Set(allProducts.map((product) => product.brand))

      setCategories(['all', ...uniqueCategories])
      setBrands(['all', ...uniqueBrands])
    }
  }, [allProducts])

  useEffect(() => {
    if (width < 1024) {
      setFiltersVisibility(false)
    } else {
      setFiltersVisibility(true)
    }
  }, [width])

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const { name, value } = event.target as HTMLInputElement | HTMLSelectElement

    if (name === 'category') {
      const categoryValue = (event.target as HTMLButtonElement)?.textContent
      if (categoryValue) {
        dispatch(updateFilter({ name, value: categoryValue }))
      }
    } else if (['minPrice', 'maxPrice', 'rating'].includes(name)) {
      dispatch(updateFilter({ name, value: Number(value) }))
    } else if (name === 'brand') {
      dispatch(updateFilter({ name, value }))
    }
  }

  return (
    <div className="bg-white h-full top-20 shadow-xl rounded-xl p-8 block dark:text-slate-300 dark:bg dark:bg-[#121212] transition-all">
      <button
        className="font-bold text-2xl lg:hidden w-full flex items-center justify-between"
        onClick={() => setFiltersVisibility(!filtersVisibility)}
      >
        <span>Filters</span>
        {filtersVisibility ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      <div
        className={`${filtersVisibility ? 'block mt-5 lg:mt-0' : ' hidden'} `}
      >
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
        <p className="font-bold text-2xl mb-5">Brand:</p>
        <select
          name="brand"
          className="p-3 rounded-2xl capitalize cursor-pointer border border-solid border-slate-400 dark:bg-transparent"
          onChange={(e) => handleChange(e)}
          value={filters.brand}
        >
          {brands.map((brand, index) => {
            return (
              <option value={brand} key={index}>
                {brand}
              </option>
            )
          })}
        </select>
        <p className="font-bold text-2xl my-5">Price:</p>
        <div>
          <label htmlFor="price1">From:</label>
          <input
            type="number"
            placeholder="From"
            className="w-full p-2 rounded-2xl capitalize cursor-pointer border border-solid border-slate-400 dark:bg-transparent"
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
            className="w-full p-2 rounded-2xl capitalize cursor-pointer border border-solid border-slate-400 mb-5 dark:bg-transparent"
            min={filters.minPrice}
            max={filters.maxPrice}
            id="price2"
            name="maxPrice"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <p className="text-2xl font-bold mb-5">Rating:</p>
        <div>
          <FilterRating filters={filters} handleChange={handleChange} />
          <button
            className="text-2xl font-bold text-[#405684] mt-3 hover:underline"
            onClick={() => dispatch(clearFilters())}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}
export default Filters
