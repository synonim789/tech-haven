import { useState } from 'react'
import { ProductType } from '../../types'

type AdminSelectProps = {
  options: ProductType[] | undefined
  value: ProductType | null
  onChange: (value: ProductType | null) => void
}

const AdminSelect = ({ options, value, onChange }: AdminSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const clearOptions = () => {
    onChange(null)
  }

  const selectOption = (option: ProductType) => {
    onChange(option)
  }
  return (
    <div
      className="relative bg-white dark:bg-[#121212] text-white rounded-xl shadow-xl flex items-center p-5 gap-2 w-full z-0"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="grow flex flex-wrap text-3xl">
        {value ? value.name : 'Choose Product'}
      </span>
      <button
        className="text-3xl hover:text-slate-400"
        onClick={(e) => {
          e.stopPropagation()
          clearOptions()
        }}
      >
        &times;
      </button>
      <div className="self-stretch w-[1px] bg-slate-600"></div>
      <div className="border-[7px] border-solid border-t-[#777] bg-transparent cursor-pointer translate-x-0 translate-y-1/4"></div>
      <ul
        className={
          'absolute left-0 p-0 w-full top-[calc(100%+5px)] bg-white dark:bg-[#121212] rounded-xl max-h-[400px] overflow-auto ' +
          ` ${isOpen ? 'block' : 'hidden'}`
        }
      >
        {options &&
          options.map((option) => {
            return (
              <li
                key={option.id}
                className="text-2xl p-3 cursor-pointer flex items-center gap-5 font-bold text-left hover:bg-[#405684] hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  selectOption(option)
                  setIsOpen(false)
                }}
              >
                <img
                  src={option.image}
                  alt={option.name}
                  className="w-[80px] rounded-md"
                />
                {option.name}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
export default AdminSelect
