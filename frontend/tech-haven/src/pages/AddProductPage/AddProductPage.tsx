import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAdminContext } from '../../context/AdminContext'
import { useAuthContext } from '../../context/AuthContext'
import './AddProductPage.css'

type CategoryType = {
  _id: string
  name: string
}

type AddProductType = {
  name: string
  description: string
  brand: string
  category: string
  price: number
  stock: number
  rating: number
  revCount: number
  isFeatured: boolean
  image: string
  images: string
}

const AddProductPage = () => {
  const [addProductForm, setAddProductForm] = useState<AddProductType | null>(
    null
  )
  const [image, setImage] = useState('')
  const [images, setImages] = useState('')

  const { categories, addProduct, getCategories, addProductError } =
    useAdminContext()!
  const { token } = useAuthContext()!

  const { register, handleSubmit, formState } = useForm({
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

  return (
    <main className="add-product-page">
      <h1 className="add-product-page__title">Add Product</h1>
      <form onSubmit={handleSubmit(addProduct)}>
        <div className="add-product__container">
          <div>
            <div className="add-product__input-container add-product__input-container--name">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: 'Product Name is required',
                })}
                placeholder="Enter Name"
              />
              {errors.name?.message && (
                <p className="add-product__error">{errors.name?.message}</p>
              )}
            </div>
            <div className="add-product__input-container add-product__input-container--description">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                rows={4}
                {...register('description', {
                  required: 'Description is required',
                })}
                placeholder="Enter Description"
              />
              {errors.description?.message && (
                <p className="add-product__error">
                  {errors.description?.message}
                </p>
              )}
            </div>
            <div className="add-product__small">
              <div className="add-product__input-container">
                <label htmlFor="brand">Brand:</label>
                <input
                  type="text"
                  id="brand"
                  {...register('brand', {
                    required: 'Brand is required',
                  })}
                  placeholder="Enter Brand"
                />
                {errors.brand?.message && (
                  <p className="add-product__error">{errors.brand?.message}</p>
                )}
              </div>
              <div className="add-product__input-container">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  {...register('category', {
                    required: 'Category is required',
                  })}
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
                  <p className="add-product__error">
                    {errors.category?.message}
                  </p>
                )}
              </div>
              <div className="add-product__input-container">
                <label htmlFor="price">Price:</label>
                <div>
                  <input
                    type="number"
                    id="price"
                    {...register('price', {
                      required: 'Price is required',
                    })}
                  />
                  <span>$</span>
                </div>
                {errors.price?.message && (
                  <p className="add-product__error">{errors.price?.message}</p>
                )}
              </div>
              <div className="add-product__input-container">
                <label htmlFor="stock">Stock:</label>
                <input
                  type="number"
                  id="stock"
                  {...register('stock', {
                    required: 'Stock is required',
                  })}
                />
                {errors.stock?.message && (
                  <p className="add-product__error">{errors.stock?.message}</p>
                )}
              </div>
              <div className="add-product__input-container">
                <label htmlFor="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  {...register('rating', {
                    required: 'Rating is required',
                  })}
                />
                {errors.rating?.message && (
                  <p className="add-product__error">{errors.rating?.message}</p>
                )}
              </div>
              <div className="add-product__input-container">
                <label htmlFor="revCount">Rev Count:</label>
                <input
                  type="number"
                  id="revCount"
                  {...register('revCount', {
                    required: 'Rev Count is required',
                  })}
                />
                {errors.revCount?.message && (
                  <p className="add-product__error">
                    {errors.revCount?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="add-product__checkbox">
              <label htmlFor="featured">Featured:</label>
              <input
                type="checkbox"
                id="featured"
                {...register('isFeatured')}
              />
            </div>
          </div>
          <div className="add-product__images">
            <div className="add-product__image-container">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="add-product__image"
                />
              )}
              <label htmlFor="mainImage">Choose Main Image...</label>

              <input
                type="file"
                id="mainImage"
                className="add-product__image-cta"
                {...register('image', {
                  required: 'Main Image is required',
                })}
                onChange={handleImageChange}
              />
              {errors.image?.message && (
                <p className="add-product__error">{errors.image?.message}</p>
              )}
            </div>

            <div className="add-product__image-container">
              {images && (
                <div>
                  {images.map((item) => {
                    return (
                      <img
                        src={URL.createObjectURL(item)}
                        className="add-product__small-image"
                      />
                    )
                  })}
                </div>
              )}
              <label htmlFor="allImages">Choose All Images...</label>
              <input
                type="file"
                id="allImages"
                multiple
                className="add-product__image-cta"
                {...register('images', {
                  required: 'All Image is required',
                })}
                onChange={handleImagesChange}
              />
              {errors.images?.message && (
                <p className="add-product__error">{errors.images?.message}</p>
              )}
            </div>
          </div>
        </div>
        {addProductError && <p>{addProductError}</p>}
        <button type="submit" className="add-product__cta">
          Add Product
        </button>
      </form>
    </main>
  )
}
export default AddProductPage
