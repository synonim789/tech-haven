import { api } from '../../api/api'
import { CategoryType } from '../../types'

const categoriesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType, void>({
      query: () => ({
        url: '/categories',
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApiSlice
