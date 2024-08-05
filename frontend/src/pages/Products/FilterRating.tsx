import { ChangeEvent, MouseEvent } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type Props = {
  filters: {
    [key: string]: string | number
    search: string
    category: string
    brand: string
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
    <div key={index} className="mb-2 flex items-center gap-x-1">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        htmlFor={`rating${rating}`}
      >
        <input
          type="radio"
          name="rating"
          id={`rating${rating}`}
          checked={filters.rating === rating}
          value={rating}
          onChange={(e) => handleChange(e)}
          className="peer relative size-5 cursor-pointer appearance-none rounded-full border border-gray-100/10 bg-gray-300/5 p-0 text-gray-900 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:size-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-gray-300 before:opacity-0 before:transition-opacity before:content-[''] checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
        />
        <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-slate-400 opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-full scale-105"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>

      <label
        htmlFor={`rating${rating}`}
        className="mt-px flex cursor-pointer select-none gap-1 text-nowrap font-light text-gray-400"
      >
        {`From ${rating}`}
        {Array.from({ length: 5 }, (_, i) => {
          if (rating - i > 0) {
            return <AiFillStar className="text-yellow-500" key={i} />
          } else {
            return <AiOutlineStar className="text-yellow-500" key={i} />
          }
        })}
      </label>
    </div>
  ))
}
export default FilterRating
