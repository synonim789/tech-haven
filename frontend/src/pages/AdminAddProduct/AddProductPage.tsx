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
    <section className="flex flex-col gap-6 max-w-[250px] md:max-w-full">
      <h2 className="mb-8 text-4xl font-bold text-center text-slate-500">
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
              <div className="flex flex-col w-full text-[20px] font-semibold cursor-pointer capitalize">
                <label htmlFor="category" className="dark:text-gray-500">
                  Category
                </label>
                <select
                  id="category"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  className="px-3 py-2 border-[2px] border-solid border-gray-300 placeholder:text-slate-500 dark:text-gray-400 outline-none shadow-lg dark:bg-transparent placeholder:capitalize rounded-xl dark:border-gray-700"
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
                  <p className="text-red-500 font-bold">
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
              <label htmlFor="featured" className="text-slate-400 font-bold">
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
          <div className="flex flex-col justify-between gap-5 mt-4 md:mt-0">
            <div className="rounded-xl bg-white dark:bg-[#222427] shadow-xl h-full w-full gap-5 flex flex-col items-center justify-center p-[10px]">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="block w-[120px]"
                />
              )}
              <label
                htmlFor="mainImage"
                className="text-2xl text-white bg-[#405684] cursor-pointer rounded-xl px-6 py-3 font-bold hover:opacity-75 hover:scale-105 transition"
              >
                Choose Main Image...
              </label>

              <input
                type="file"
                id="mainImage"
                className="w-0 h-0 opacity-0 overflow-hidden absolute -z-10"
                {...register('image', {
                  required: 'Main Image is required',
                })}
                onChange={handleImageChange}
              />
              {errors.image?.message && (
                <p className="text-red-500 font-bold">
                  {errors.image?.message}
                </p>
              )}
            </div>

            <div className="rounded-xl bg-white dark:bg-[#222427] shadow-xl h-full w-full gap-5 flex flex-col items-center justify-center p-[10px]">
              {images && (
                <div className="grid gap-2 grid-cols-4">
                  {images &&
                    images.map((item, index) => {
                      return (
                        <img
                          src={URL.createObjectURL(item)}
                          className="w-[60px] rounded-md block"
                          key={index}
                        />
                      )
                    })}
                </div>
              )}
              <label
                htmlFor="allImages"
                className="text-2xl text-white bg-[#405684] cursor-pointer rounded-xl px-6 py-3 font-bold hover:opacity-75 hover:scale-105 transition"
              >
                Choose All Images...
              </label>
              <input
                type="file"
                id="allImages"
                multiple
                className="w-0 h-0 opacity-0 overflow-hidden absolute -z-10"
                {...register('images', {
                  required: 'All Image is required',
                })}
                onChange={handleImagesChange}
              />
              {errors.images?.message && (
                <p className="text-red-500 font-bold">
                  {errors.images?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {addProductError && (
          <p className="text-center text-red-500 text-2xl font-bold">
            {'data' in addProductError ? (
              <>{addProductError.data.message}</>
            ) : undefined}
          </p>
        )}
        <button
          type="submit"
          className="bg-[#405684] text-white px-4 py-2 font-bold text-[20px] mt-8 rounded-xl hover:opacity-80 hover:scale-105 transition"
        >
          Add Product
        </button>
      </form>
    </section>
  )
}
export default AddProductPage
