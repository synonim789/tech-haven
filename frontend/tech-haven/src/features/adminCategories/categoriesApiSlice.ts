import { api } from '../../api/api'
import { CategoryType } from '../../types'

const categoriesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType, void>({
      query: () => ({
        url: '/categories',
      }),
      providesTags: ['Categories'],
    }),
    addCategory: builder.mutation({
      query: ({ category }) => ({
        url: '/categories',
        method: 'POST',
        body: { name: category },
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice
