import { ChangeEvent, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'react-use'
import { clearFilters, updateFilter } from '../../features/products/filters'
import { RootState } from '../../store'
import { ProductType } from '../../types'
import { formatPrice } from '../../utils/formatPrice'
import FilterRating from './FilterRating'

type Props = {
  allProducts?: ProductType[]
}

const Filters = ({ allProducts }: Props) => {
  const { width } = useWindowSize()
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.filters.filters)
  const maxPrice = useSelector((state: RootState) => state.filters.maxPrice)
  const price = useSelector((state: RootState) => state.filters.filters.price)

  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [filtersVisibility, setFiltersVisibility] = useState(true)

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
    } else if (['rating', 'price'].includes(name)) {
      dispatch(updateFilter({ name, value: Number(value) }))
    } else if (name === 'brand') {
      dispatch(updateFilter({ name, value }))
    }
  }
  useEffect(() => {
    dispatch(updateFilter({ name: 'price', value: maxPrice }))
  }, [dispatch, maxPrice])

  return (
    <div className="bg-white h-full top-20 shadow-xl rounded-xl p-8 block dark:text-slate-300  dark:bg-[#121212] transition-all">
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
        <div className="p-4">
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
        </div>

        <p className="font-bold text-2xl mb-5">Brand:</p>
        <div className="p-4">
          <select
            name="brand"
            className="p-3 rounded-2xl capitalize cursor-pointer border  dark:bg-transparent  border-gray-100/10"
            onChange={(e) => handleChange(e)}
            value={filters.brand}
          >
            {brands.map((brand, index) => {
              return (
                <option value={brand} key={index} className="">
                  {brand}
                </option>
              )
            })}
          </select>
        </div>

        <p className="font-bold text-2xl my-5">Price:</p>
        <div className="p-4">
          <p>{formatPrice(price)}</p>
          <input
            type="range"
            max={maxPrice}
            step={100}
            value={price}
            onChange={(e) => handleChange(e)}
            name="price"
          />
          <div className="flex justify-between">
            <p>{formatPrice(0)}</p>
            <p className="">{formatPrice(maxPrice)}</p>
          </div>
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
