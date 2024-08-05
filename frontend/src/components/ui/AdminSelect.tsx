import { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { ProductType } from '../../types'

type Props = {
  options: ProductType[] | undefined
  value: ProductType | null
  onChange: (value: ProductType | null) => void
}

const AdminSelect = ({ options, value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const clearOptions = () => {
    onChange(null)
  }

  const selectOption = (option: ProductType) => {
    onChange(option)
  }
  return (
    <div
      className="relative z-0 flex w-full items-center gap-2 rounded-xl bg-white p-5 shadow-xl dark:bg-[#1D1F22] dark:text-white"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="flex grow flex-wrap text-2xl">
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
      <div className="w-px self-stretch bg-slate-600"></div>
      {isOpen ? <IoMdArrowDropup size={25} /> : <IoMdArrowDropdown size={25} />}
      <ul
        className={
          'absolute left-0 p-0 w-full top-[calc(100%+5px)] bg-white dark:bg-[#1D1F22] rounded-xl max-h-[400px] overflow-auto ' +
          ` ${isOpen ? 'block' : 'hidden'}`
        }
      >
        {options &&
          options.map((option) => {
            return (
              <li
                key={option._id}
                className="flex cursor-pointer items-center gap-5 p-3 text-left text-2xl font-bold hover:bg-[#405684] hover:text-white"
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
