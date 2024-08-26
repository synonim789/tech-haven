import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import Textarea from '../../components/form/Textarea'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetCategoriesQuery } from '../../features/adminCategories/categoriesApiSlice'
import { useAddProductMutation } from '../../features/adminProducts/adminProductsApiSlice'
import { cn } from '../../utils/cn'
import { addProductSchema, AddProductValues } from '../../validation/product'

const AddProductPage = () => {
  const [image, setImage] = useState<File | null>(null)
  const [images, setImages] = useState<File[] | null>(null)

  const { data: categories } = useGetCategoriesQuery()
  const [addProduct, { error: addProductError, isLoading }] =
    useAddProductMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddProductValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      price: 0,
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      isFeatured: false,
      image: undefined,
      images: undefined,
    },
    mode: 'onChange',
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const filesArray = Array.from(files)
      setImages(filesArray)
    }
  }

  const submitHandler = async (data: AddProductValues) => {
    const formData = new FormData()
    console.log(data.isFeatured)
    if (data.image.length) {
      formData.append('image', data.image[0])
    }
    if (data.images.length) {
      Array.from(data.images).forEach((file) => formData.append('images', file))
    }

    formData.append('isFeatured', data.isFeatured ? 'true' : 'false')

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'image' && key !== 'images' && key !== 'isFeatured') {
        formData.append(key, value.toString())
      }
    })

    try {
      await addProduct(formData).unwrap()
      toast.success('Product Added Successfully')

      reset()
      setImage(null)
      setImages(null)
    } catch (err) {
      if (err instanceof Error && 'message' in err) {
        toast.error(err.message)
      }
    }
  }

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <section className="flex max-w-[250px] flex-col gap-6 md:max-w-full">
      <h2 className="mb-8 text-center text-4xl font-bold text-slate-500">
        Add Product
      </h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col md:flex-row md:gap-x-5">
          <div className="md:space-y-5">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                type="text"
                placeholder="Name"
                {...register('name')}
                error={errors.name?.message}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="text-red-500 font-semibold">{message}</p>
                )}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                error={errors?.description?.message}
                {...register('description')}
              />
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <p className="text-red-500 font-semibold">{message}</p>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  type="text"
                  error={errors.brand?.message}
                  {...register('brand')}
                />
                <ErrorMessage
                  errors={errors}
                  name="brand"
                  render={({ message }) => (
                    <p className="text-red-500 font-semibold">{message}</p>
                  )}
                />
              </div>

              <div className="flex w-full cursor-pointer flex-col  font-semibold capitalize">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  {...register('category')}
                  className={cn(
                    'rounded-xl border-2 border-solid border-gray-300 px-3 py-2 shadow-lg outline-none placeholder:capitalize placeholder:text-slate-500 dark:border-gray-700 dark:bg-transparent dark:text-gray-400',
                    {
                      '!border-red-400': errors.category?.message,
                    },
                  )}
                >
                  <option value="" hidden>
                    Choose Category
                  </option>
                  {categories?.map((category) => {
                    return (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    )
                  })}
                </select>
                <ErrorMessage
                  errors={errors}
                  name="category"
                  render={({ message }) => (
                    <p className="text-red-500 font-semibold">{message}</p>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  {...register('price')}
                  error={errors?.price?.message}
                />
                <ErrorMessage
                  errors={errors}
                  name="price"
                  render={({ message }) => (
                    <p className="text-red-500 font-semibold">{message}</p>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="countInStock">Stock</Label>
                <Input
                  id="countInStock"
                  type="number"
                  {...register('countInStock')}
                  error={errors?.countInStock?.message}
                />
                <ErrorMessage
                  errors={errors}
                  name="countInStock"
                  render={({ message }) => (
                    <p className="text-red-500 font-semibold">{message}</p>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step={0.01}
                  {...register('rating')}
                  error={errors?.rating?.message}
                />
                <ErrorMessage
                  errors={errors}
                  name="rating"
                  render={({ message }) => (
                    <p className="text-red-500 font-semibold">{message}</p>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="numReviews">Review Count</Label>
                <Input
                  id="numReviews"
                  type="number"
                  {...register('numReviews')}
                  error={errors?.numReviews?.message}
                />
                <ErrorMessage
                  errors={errors}
                  name="numReviews"
                  render={({ message }) => (
                    <p className="text-red-500 font-semibold">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <label htmlFor="featured" className="font-semibold text-gray-500">
                Featured:
              </label>
              <input
                type="checkbox"
                id="featured"
                {...register('isFeatured')}
                className="w-5 accent-[#405684]"
              />
              <ErrorMessage errors={errors} name="isFeatured" />
            </div>
          </div>
          <div className="mt-4 flex flex-col justify-between gap-5 md:mt-0">
            <div className="flex size-full flex-col items-center justify-center gap-5 rounded-xl bg-white p-[10px] shadow-xl dark:bg-[#222427]">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="block w-[120px]"
                />
              )}
              <Label
                htmlFor="mainImage"
                className="cursor-pointer rounded-xl bg-[#405684] px-6 py-3 text-2xl font-bold !text-white transition hover:scale-105 hover:opacity-75"
              >
                Choose Main Image...
              </Label>

              <Input
                type="file"
                id="mainImage"
                className="absolute -z-10 size-0 overflow-hidden opacity-0"
                {...register('image')}
                onChange={handleImageChange}
              />
              <ErrorMessage
                errors={errors}
                name="image"
                render={({ message }) => (
                  <p className="text-red-500 font-semibold">{message}</p>
                )}
              />
            </div>

            <div className="flex size-full flex-col items-center justify-center gap-5 rounded-xl bg-white p-[10px] shadow-xl dark:bg-[#222427]">
              {images && (
                <div className="grid grid-cols-4 gap-2">
                  {images &&
                    images.map((item, index) => {
                      return (
                        <img
                          src={URL.createObjectURL(item)}
                          className="block w-[60px] rounded-md"
                          key={index}
                        />
                      )
                    })}
                </div>
              )}
              <Label
                htmlFor="allImages"
                className="cursor-pointer rounded-xl bg-[#405684] px-6 py-3 text-2xl font-bold !text-white transition hover:scale-105 hover:opacity-75"
              >
                Choose All Images...
              </Label>
              <Input
                type="file"
                id="allImages"
                multiple
                className="absolute -z-10 size-0 overflow-hidden opacity-0"
                {...register('images')}
                onChange={handleImagesChange}
              />
              <ErrorMessage
                errors={errors}
                name="images"
                render={({ message }) => (
                  <p className="text-red-500 font-semibold">{message}</p>
                )}
              />
            </div>
          </div>
        </div>
        {addProductError && (
          <p className="text-center text-2xl font-bold text-red-500">
            {'data' in addProductError ? (
              <>{addProductError.data.message}</>
            ) : undefined}
          </p>
        )}
        <button
          type="submit"
          className="mt-8 rounded-xl bg-[#405684] px-4 py-2 text-[20px] font-bold text-white transition hover:scale-105 hover:opacity-80"
        >
          Add Product
        </button>
      </form>
    </section>
  )
}
export default AddProductPage
