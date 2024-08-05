import * as React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FormInput from '../../components/form/FormInput'
import FormTextarea from '../../components/form/FormTextarea'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetCategoriesQuery } from '../../features/adminCategories/categoriesApiSlice'
import { useAddProductMutation } from '../../features/adminProducts/adminProductsApiSlice'

type CategoryType = {
  _id: string
  name: string
}

type DataType = {
  name: string
  category: string
  description: string
  image: FileList[] | null
  images: FileList[] | null
  isFeatured: boolean
  price: number
  rating: number
  numReviews: number
  stock: number
  brand: string
}

const AddProductPage = () => {
  const [image, setImage] = useState<File | null>(null)
  const [images, setImages] = useState<File[] | null>(null)

  const { data: categories } = useGetCategoriesQuery()
  const [addProduct, { error: addProductError, isSuccess, isLoading }] =
    useAddProductMutation()

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      price: 0,
      stock: 0,
      rating: 0,
      numReviews: 0,
      isFeatured: false,
      image: null,
      images: null,
    },
  })

  const { errors } = formState

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

  useEffect(() => {
    if (isSuccess) {
      reset()
      setImage(null)
      setImages(null)
    }
  }, [isSuccess])

  const submitHandler = async (data: DataType) => {
    const formData: any = new FormData()
    if (data.images) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i])
      }
    }

    if (data.image) {
      formData.append('image', data.image[0])
    }

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('brand', data.brand)
    formData.append('category', data.category)
    formData.append('price', data.price)
    formData.append('countInStock', data.stock)
    formData.append('rating', data.rating)
    formData.append('numReviews', data.numReviews)
    formData.append('isFeatured', data.isFeatured)
    try {
      await addProduct(formData).unwrap()
      toast.success('Product Added Successfully')
    } catch (err: any) {
      toast.error(err.message)
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
          <div>
            <FormInput
              name="name"
              type="text"
              register={{
                ...register('name', {
                  required: 'Product Name is required',
                }),
              }}
              error={errors.name?.message}
            />
            <FormTextarea
              name="description"
              error={errors?.description?.message}
              register={{
                ...register('description', {
                  required: 'Description is required',
                }),
              }}
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <FormInput
                name="brand"
                type="text"
                error={errors.brand?.message}
                register={{
                  ...register('brand', {
                    required: 'Brand is required',
                  }),
                }}
              />
              <div className="flex w-full cursor-pointer flex-col text-[20px] font-semibold capitalize">
                <label htmlFor="category" className="dark:text-gray-500">
                  Category
                </label>
                <select
                  id="category"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  className="rounded-xl border-2 border-solid border-gray-300 px-3 py-2 shadow-lg outline-none placeholder:capitalize placeholder:text-slate-500 dark:border-gray-700 dark:bg-transparent dark:text-gray-400"
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
                {errors.category?.message && (
                  <p className="font-bold text-red-500">
                    {errors.category?.message}
                  </p>
                )}
              </div>
              <FormInput
                name="price"
                type="number"
                register={{
                  ...register('price', {
                    required: 'Price is required',
                    min: {
                      value: 1,
                      message: 'price must be at least 1',
                    },
                  }),
                }}
                error={errors?.price?.message}
              />
              <FormInput
                name="stock"
                type="number"
                register={{
                  ...register('stock', {
                    required: 'Stock is required',
                    min: {
                      value: 1,
                      message: 'stock must be at least 1',
                    },
                  }),
                }}
                error={errors?.stock?.message}
              />
              <FormInput
                name="rating"
                type="number"
                register={{
                  ...register('rating', {
                    required: 'Rating is required',
                    min: {
                      value: 1,
                      message: 'price must be at least 1',
                    },
                  }),
                }}
                error={errors?.rating?.message}
              />
              <FormInput
                name="numReviews"
                type="number"
                register={{
                  ...register('numReviews', {
                    required: 'Rev Count is required',
                    min: {
                      value: 1,
                      message: 'Rev Count must be more than 1',
                    },
                  }),
                }}
                error={errors?.numReviews?.message}
              />
            </div>
            <div className="mt-8 flex justify-end gap-3 text-[20px] ">
              <label htmlFor="featured" className="font-bold text-slate-400">
                Featured:
              </label>
              <input
                type="checkbox"
                id="featured"
                {...register('isFeatured')}
                className="w-5 accent-[#405684]"
              />
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
              <label
                htmlFor="mainImage"
                className="cursor-pointer rounded-xl bg-[#405684] px-6 py-3 text-2xl font-bold text-white transition hover:scale-105 hover:opacity-75"
              >
                Choose Main Image...
              </label>

              <input
                type="file"
                id="mainImage"
                className="absolute -z-10 size-0 overflow-hidden opacity-0"
                {...register('image', {
                  required: 'Main Image is required',
                })}
                onChange={handleImageChange}
              />
              {errors.image?.message && (
                <p className="font-bold text-red-500">
                  {errors.image?.message}
                </p>
              )}
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
              <label
                htmlFor="allImages"
                className="cursor-pointer rounded-xl bg-[#405684] px-6 py-3 text-2xl font-bold text-white transition hover:scale-105 hover:opacity-75"
              >
                Choose All Images...
              </label>
              <input
                type="file"
                id="allImages"
                multiple
                className="absolute -z-10 size-0 overflow-hidden opacity-0"
                {...register('images', {
                  required: 'All Image is required',
                })}
                onChange={handleImagesChange}
              />
              {errors.images?.message && (
                <p className="font-bold text-red-500">
                  {errors.images?.message}
                </p>
              )}
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
