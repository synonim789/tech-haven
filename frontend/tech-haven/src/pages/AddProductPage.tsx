import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAdminContext } from '../context/AdminContext'
import { useAuthContext } from '../context/AuthContext'

type CategoryType = {
  _id: string
  name: string
}

const AddProductPage = () => {
  const [image, setImage] = useState(null)
  const [images, setImages] = useState(null)

  const {
    categories,
    addProduct,
    getCategories,
    addProductError,
    addProductSuccess,
  } = useAdminContext()!
  const { token } = useAuthContext()!

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      token: token.token,
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
  useEffect(() => {
    getCategories()
  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImage(file)
  }

  const handleImagesChange = (event) => {
    const files = event.target.files
    const filesArray = Array.from(files)
    setImages(filesArray)
  }

  useEffect(() => {
    reset()
  }, [addProductSuccess])

  return (
    <main className="text-center mb-10">
      <h1 className="mb-8 text-4xl font-bold">Add Product</h1>
      <form onSubmit={handleSubmit(addProduct)}>
        <div className="flex">
          <div>
            <div className="flex flex-col text-left mb-8">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: 'Product Name is required',
                })}
                placeholder="Enter Name"
                className="px-6 py-3 text-[20px] border-solid border-slate-300 shadow-lg rounded-xl "
              />
              {errors.name?.message && (
                <p className="text-red-500 font-bold">{errors.name?.message}</p>
              )}
            </div>
            <div className="flex flex-col text-left mb-8 ">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                rows={4}
                {...register('description', {
                  required: 'Description is required',
                })}
                placeholder="Enter Description"
                className="px-6 py-3 text-[20px] border-solid border-slate-300 shadow-lg rounded-xl resize-none"
              />
              {errors.description?.message && (
                <p className="text-red-500 font-bold">
                  {errors.description?.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col text-left">
                <label htmlFor="brand">Brand:</label>
                <input
                  type="text"
                  id="brand"
                  {...register('brand', {
                    required: 'Brand is required',
                  })}
                  placeholder="Enter Brand"
                  className="px-6 py-3 text-[20px] border-solid border-slate-300 shadow-lg rounded-xl resize-none"
                />
                {errors.brand?.message && (
                  <p className="text-red-500 font-bold">
                    {errors.brand?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  className="px-6 py-3 text-[20px] border-solid border-slate-300 shadow-lg rounded-xl resize-none"
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
              <div className="flex flex-col text-left">
                <label htmlFor="price">Price:</label>
                <div>
                  <input
                    type="number"
                    id="price"
                    {...register('price', {
                      required: 'Price is required',
                    })}
                    className="px-6 py-3 text-[20px] border-solid border-slate-300 shadow-lg rounded-xl resize-none"
                  />
                  <span>$</span>
                </div>
                {errors.price?.message && (
                  <p className="text-red-500 font-bold">
                    {errors.price?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="stock">Stock:</label>
                <input
                  type="number"
                  id="stock"
                  {...register('stock', {
                    required: 'Stock is required',
                  })}
                  className="px-6 py-3 text-[20px] border-solid border-slate-300 shadow-lg rounded-xl resize-none"
                />
                {errors.stock?.message && (
                  <p className="text-red-500 font-bold">
                    {errors.stock?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  {...register('rating', {
                    required: 'Rating is required',
                  })}
                  className="px-6 py-3 text-[20px] border-solid border-slate-300 shadow-lg rounded-xl resize-none"
                />
                {errors.rating?.message && (
                  <p className="text-red-500 font-bold">
                    {errors.rating?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="revCount">Rev Count:</label>
                <input
                  type="number"
                  id="revCount"
                  {...register('revCount', {
                    required: 'Rev Count is required',
                  })}
                  className="px-6 py-3 text-[20px] border-solid border-slate-300 shadow-lg rounded-xl resize-none"
                />
                {errors.revCount?.message && (
                  <p className="text-red-500 font-bold">
                    {errors.revCount?.message}
                  </p>
                )}
              </div>
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
                <div className="flex">
                  {images &&
                    images.map((item) => {
                      return (
                        <img
                          src={URL.createObjectURL(item)}
                          className="w-[60px]"
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
          className="bg-[#120b90] text-white px-6 py-3 font-bold text-[20px] mt-8 rounded-xl hover:opacity-80 hover:scale-105 transition"
        >
          Add Product
        </button>
      </form>
    </main>
  )
}
export default AddProductPage
