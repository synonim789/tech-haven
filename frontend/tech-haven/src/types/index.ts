import { ReactElement } from 'react'

export type ProductType = {
  brand: string
  category: CategoryType
  countInStock: number
  dateCreated: string
  description: string
  id: string
  image: string
  images: string[]
  isFeatured: boolean
  name: string
  price: number
  rating: number
  numReviews: number
}

export type CategoryType = {
  name: string
  _id: string
}

export type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export type UserType = {
  _id: string
  name: string
  email: string
  phone: string
  street: string
  apartment: string
  city: string
  zip: string
  country: string
  role: string
}

export type TokenType = {
  token: string
}

export type UserWithTokenType = {
  name: string
  email: string
  phone: string
  street: string
  apartment: string
  city: string
  zip: string
  country: string
  token: string
}
