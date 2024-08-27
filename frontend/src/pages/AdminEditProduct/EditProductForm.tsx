import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import Textarea from '../../components/form/Textarea'
import { useGetCategoriesQuery } from '../../features/adminCategories/categoriesApiSlice'
import { useEditProductMutation } from '../../features/adminProducts/adminProductsApiSlice'
import { ProductType } from '../../types'
import { cn } from '../../utils/cn'
import { editProductSchema, EditProductValues } from '../../validation/product'

type Props = {
  product: ProductType
  onUpdate: (updatedProduct: ProductType) => void
}

const EditProductForm = ({ product, onUpdate }: Props) => {
  const { data: categories, isLoading } = useGetCategoriesQuery()
  const [editProduct, { error: editProductError }] = useEditProductMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProductValues>({
    resolver: zodResolver(editProductSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    reset({
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category._id,
      countInStock: product.countInStock,
      isFeatured: product.isFeatured,
      numReviews: product.numReviews,
      price: product.price,
      rating: product.rating,
    })
  }, [product])

  const submitHandler = async (data: EditProductValues) => {
    try {
      const updatedProduct = await editProduct({
        ...data,
        id: product._id,
      }).unwrap()
      toast.success('Product updated')
      onUpdate(updatedProduct)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex max-w-[250px] flex-col items-center justify-center sm:max-w-full space-y-5 mt-5"
    >
      <div className="w-full">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter Product Name"
          error={errors?.name?.message}
          {...register('name')}
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <p className="text-red-400 font-semibold">{message}</p>
          )}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter description"
          error={errors?.description?.message}
          {...register('description')}
        />
        <ErrorMessage
          errors={errors}
          name="description"
          render={({ message }) => (
            <p className="text-red-400 font-semibold">{message}</p>
          )}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="Enter brand"
            {...register('brand')}
            error={errors?.brand?.message}
          />
          <ErrorMessage
            errors={errors}
            name="brand"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            className={cn(
              'rounded-xl border-2 border-solid border-gray-300 px-3 py-2 shadow-lg outline-none placeholder:capitalize placeholder:text-slate-500 dark:border-gray-700 dark:bg-transparent dark:text-gray-400 w-full font-semibold capitalize',
              {
                '!border-red-400': errors.category?.message,
              },
            )}
            {...register('category')}
          >
            <option value="" hidden>
              Choose Category
            </option>
            {categories?.map((category) => {
              console.log(category._id)
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              )
            })}
            <ErrorMessage
              errors={errors}
              name="category"
              render={({ message }) => (
                <p className="text-red-400 font-semibold">{message}</p>
              )}
            />
          </select>
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter Price"
            error={errors?.price?.message}
            {...register('price')}
          />
          <ErrorMessage
            errors={errors}
            name="price"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            placeholder="Enter count in stock"
            type="number"
            {...register('countInStock')}
            error={errors?.countInStock?.message}
          />
          <ErrorMessage
            errors={errors}
            name="countInStock"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            step={0.01}
            error={errors.rating?.message}
            {...register('rating')}
          />
          <ErrorMessage
            errors={errors}
            name="rating"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="numReviews">Review Count</Label>
          <Input
            id="numReviews"
            placeholder="Enter number of reviews"
            type="number"
            error={errors?.numReviews?.message}
            {...register('numReviews')}
          />
          <ErrorMessage
            errors={errors}
            name="numReviews"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
      </div>
      <div className="my-8 flex gap-3 text-[20px]">
        <label htmlFor="featured" className="font-bold dark:text-gray-400">
          Featured:
        </label>
        <input
          type="checkbox"
          id="featured"
          {...register('isFeatured')}
          className="w-5 accent-[#405684]"
        />
      </div>
      {editProductError && (
        <p className="flex flex-col font-bold text-red-500">
          {'data' in editProductError ? editProductError.data.message : ''}
        </p>
      )}

      <FormButton text="Edit Product" loading={false} />
    </form>
  )
}
export default EditProductForm
