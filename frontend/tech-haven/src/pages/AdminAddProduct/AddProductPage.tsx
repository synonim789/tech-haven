import * as React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/form/FormInput'
import FormTextarea from '../../components/form/FormTextarea'
import { useAdminContext } from '../../context/AdminContext'
import { useAuthContext2 } from '../../context/AuthContext2'

type CategoryType = {
  _id: string
  name: string
}

const AddProductPage = () => {
  const [image, setImage] = useState<File | null>(null)
  const [images, setImages] = useState<File[] | null>(null)

  const { categories, addProduct, addProductError, addProductSuccess } =
    useAdminContext()!
  const { token } = useAuthContext2()!

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      token: token,
      name: '',
      description: '',
      brand: '',
      category: '',
      price: 0,
      stock: 0,
      rating: 0,
      revCount: 0,
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
    reset()
  }, [addProductSuccess])

  return (
    <main className="text-left mb-10">
      <h1 className="mb-8 text-4xl font-bold text-center">Add Product</h1>
      <form onSubmit={handleSubmit(addProduct)}>
        <div className="flex flex-col md:flex-row">
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
                  {categories.map((category: CategoryType) => {
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
                  }),
                }}
                error={errors?.rating?.message}
              />
              <FormInput
                name="reviews"
                type="number"
                register={{
                  ...register('revCount', {
                    required: 'Rev Count is required',
                  }),
                }}
                error={errors?.revCount?.message}
              />
            </div>
            <div className="mt-8 flex justify-end gap-3 text-[20px]">
              <label htmlFor="featured">Featured:</label>
              <input
                type="checkbox"
                id="featured"
                {...register('isFeatured')}
                className="w-5 accent-[#120b90]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-[70px] ml-[30px]">
            <div className="rounded-xl bg-white shadow-xl h-full w-[400px] gap-14 flex flex-col items-center justify-center p-[10px]">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="block w-[120px]"
                />
              )}
              <label
                htmlFor="mainImage"
                className="text-2xl text-white bg-[#120b90] cursor-pointer rounded-xl px-6 py-3 font-bold hover:opacity-75 hover:scale-105 transition"
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

            <div className="rounded-xl bg-white shadow-xl h-full w-[400px] gap-14 flex flex-col items-center justify-center p-[10px]">
              {images && (
                <div className="flex gap-4">
                  {images &&
                    images.map((item) => {
                      return (
                        <img
                          src={URL.createObjectURL(item)}
                          className="w-[60px] rounded-md"
                        />
                      )
                    })}
                </div>
              )}
              <label
                htmlFor="allImages"
                className="text-2xl text-white bg-[#120b90] cursor-pointer rounded-xl px-6 py-3 font-bold hover:opacity-75 hover:scale-105 transition"
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
        {addProductError && <p>{addProductError}</p>}
        <button
          type="submit"
          className="bg-[#120b90] text-white px-4 py-2 font-bold text-[20px] mt-8 rounded-xl hover:opacity-80 hover:scale-105 transition"
        >
          Add Product
        </button>
      </form>
    </main>
  )
}
export default AddProductPage
