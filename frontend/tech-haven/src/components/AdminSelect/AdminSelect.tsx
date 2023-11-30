import { useState } from 'react'
import './AdminSelect.css'

const AdminSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const clearOptions = () => {
    onChange(null)
  }

  const selectOption = (option) => {
    onChange(option)
  }
  return (
    <div className="admin-select" onClick={() => setIsOpen((prev) => !prev)}>
      <span className="admin-select__value">
        {value ? value.name : 'Choose Product'}
      </span>
      <button
        className="admin-select__clear-btn"
        onClick={(e) => {
          e.stopPropagation()
          clearOptions()
        }}
      >
        &times;
      </button>
      <div className="admin-select__divider"></div>
      <div className="admin-select__caret"></div>
      <ul
        className={
          'admin-select__options' +
          ` ${isOpen && 'admin-select__options--show'}`
        }
      >
        {options.map((option) => {
          return (
            <li
              key={option.id}
              className="admin-select__option"
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
              }}
            >
              <img
                src={option.image}
                alt={option.name}
                className="admin-select__image"
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
