import { api } from '../../api/api'
import { CategoryType } from '../../types'
import { AddCategoryValues } from '../../validation/category'

const categoriesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], void>({
      query: () => ({
        url: '/categories',
      }),
      providesTags: ['Categories'],
    }),
    addCategory: builder.mutation<CategoryType, AddCategoryValues>({
      query: ({ name }) => ({
        url: '/categories',
        method: 'POST',
        body: { name },
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
    editCategory: builder.mutation<CategoryType, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} = categoriesApiSlice
