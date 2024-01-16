import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import FormTextarea from '../../components/form/FormTextarea'
import { useGetCategoriesQuery } from '../../features/adminCategories/categoriesApiSlice'
import { useEditProductMutation } from '../../features/adminProducts/adminProductsApiSlice'
import { CategoryType, ProductType } from '../../types'

type EditProductFormProps = {
  product: ProductType
}

type EditProductType = {
  name: string
  description: string
  brand: string
  category: string
  countInStock: number
  rating: number
  numReviews: number
  isFeatured: boolean
  price: number
  id: string
}

const EditProductForm = ({ product }: EditProductFormProps) => {
  const [editForm, setEditForm] = useState<EditProductType | null>(null)

  const { data: categories } = useGetCategoriesQuery()
  const [editProduct, { error: editProductError }] = useEditProductMutation()

  const { register, handleSubmit, reset, formState } =
    useForm<EditProductType>()

  const { errors } = formState

  useEffect(() => {
    setEditForm({
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category._id,
      countInStock: product.countInStock,
      rating: product.rating,
      numReviews: product.numReviews,
      isFeatured: product.isFeatured,
      price: product.price,
      id: product.id,
    })
  }, [product])

  useEffect(() => {
    reset(editForm!)
  }, [editForm])

  const submitHandler = async (data: EditProductType) => {
    try {
      const response = await editProduct(data).unwrap()
      console.log(response)

      toast.success('Product updated')
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center items-center"
      >
        <FormInput
          type="text"
          name="name"
          register={{ ...register('name', { required: 'Name is required' }) }}
          error={errors?.name?.message}
        />
        <FormTextarea
          name="description"
          register={{
            ...register('description', {
              required: 'Description is required',
            }),
          }}
          error={errors?.description?.message}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FormInput
            name="brand"
            type="text"
            register={{
              ...register('brand', {
                required: 'brand is required',
              }),
            }}
            error={errors?.brand?.message}
          />
          <div className="flex flex-col w-full text-[20px] font-semibold cursor-pointer capitalize my-2">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              {...register('category', {
                required: 'Category is required',
              })}
              className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl placeholder:capitalize"
            >
              <option value="" disabled>
                Choose Category
              </option>
              {categories?.map((category: CategoryType) => {
                return (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                )
              })}
            </select>
          </div>
          <FormInput
            name="price"
            type="number"
            register={{
              ...register('price', {
                required: 'Price is required',
              }),
            }}
            error={errors?.price?.message}
          />
          <FormInput
            name="stock"
            type="number"
            register={{
              ...register('countInStock', {
                required: 'stock is required',
              }),
            }}
            error={errors?.brand?.message}
          />
          <FormInput
            name="rating"
            type="number"
            register={{
              ...register('rating', {
                required: 'Rating is required',
              }),
            }}
          />
          <FormInput
            name="reviews"
            type="number"
            register={{
              ...register('numReviews', {
                required: 'Number of Reviews is required',
              }),
            }}
            error={errors?.numReviews?.message}
          />
        </div>
        <div className="my-8 flex gap-3 text-[20px]">
          <label htmlFor="featured">Featured:</label>
          <input
            type="checkbox"
            id="featured"
            {...register('isFeatured')}
            className="w-5 accent-[#120b90]"
          />
        </div>
        {editProductError && (
          <p className="font-bold text-red-600 flex flex-col">
            {'data' in editProductError ? editProductError.data.message : ''}
          </p>
        )}

        <FormButton text="Edit Product" loading={false} />
      </form>
    </>
  )
}
export default EditProductForm
