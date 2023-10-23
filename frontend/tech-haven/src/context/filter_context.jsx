import { createContext, useContext, useEffect } from 'react'
import { useProductsContext } from './products_context'
import axios from 'axios'
const FilterContext = createContext()

const initialState = {}
export const FilterProvider = ({ children }) => {
  return <FilterContext.Provider>{children}</FilterContext.Provider>
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
