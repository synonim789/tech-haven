import { AnimatePresence, motion } from 'framer-motion'
import { ChangeEvent, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'react-use'
import {
  clearFilters,
  resetPaginaiton,
  updateFilter,
} from '../../features/products/filters'
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
    dispatch(resetPaginaiton())
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
    <div className="top-20 block h-full rounded-xl bg-white p-8 shadow-xl transition-all  dark:bg-[#121212] dark:text-slate-300">
      <button
        className="flex w-full items-center justify-between text-2xl font-bold lg:hidden"
        onClick={() => setFiltersVisibility(!filtersVisibility)}
      >
        <span>Filters</span>
        {filtersVisibility ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <AnimatePresence>
        {filtersVisibility && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="mb-5 mt-6 text-2xl font-bold lg:mt-0">Category:</p>
            <div className="p-4">
              {categories.map((category, index) => {
                return (
                  <button
                    key={index}
                    className={
                      category === filters.category
                        ? 'mb-2 block text-[18px] font-bold capitalize underline'
                        : 'mb-2 block text-[18px] capitalize'
                    }
                    name="category"
                    onClick={(e) => handleChange(e)}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            <p className="mb-5 text-2xl font-bold">Brand:</p>
            <div className="p-4">
              <select
                name="brand"
                className="cursor-pointer rounded-2xl border border-gray-100/10 p-3  capitalize  dark:bg-transparent"
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

            <p className="my-5 text-2xl font-bold">Price:</p>
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

            <p className="mb-5 text-2xl font-bold">Rating:</p>
            <div>
              <FilterRating filters={filters} handleChange={handleChange} />
              <button
                className="mt-3 text-2xl font-bold text-[#405684] hover:underline"
                onClick={() => dispatch(clearFilters())}
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default Filters
