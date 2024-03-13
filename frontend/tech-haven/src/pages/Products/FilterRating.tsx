import { ChangeEvent, MouseEvent } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type Props = {
  filters: {
    [key: string]: string | number
    search: string
    category: string
    brand: string
    minPrice: number
    maxPrice: number
    rating: number
  }
  handleChange: (
    event:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | MouseEvent<HTMLButtonElement>
  ) => void
}

const FilterRating = ({ filters, handleChange }: Props) => {
  const rating = [5, 4, 3, 2, 1]

  return rating.map((rating, index) => (
    <div key={index} className="mb-2 flex items-center flex-row gap-1">
      <input
        type="radio"
        name="rating"
        id={`rating${rating}`}
        checked={filters.rating === rating}
        value={rating}
        onChange={(e) => handleChange(e)}
      />
      <label
        htmlFor={`rating${rating}`}
        className="flex flex-row items-center gap-1"
      >
        {`From ${rating}`}
        {Array.from({ length: 5 }, (_, i) => {
          if (rating - i > 0) {
            return <AiFillStar className="text-yellow-500" />
          } else {
            return <AiOutlineStar className="text-yellow-500" />
          }
        })}
      </label>
    </div>
  ))
}
export default FilterRating
