import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import './AmountButtons.css'

const AmountButtons = ({ amount, increase, decrease }) => {
  return (
    <div className="addtocart-container__amount">
      <button className="addtocart-decrease" onClick={decrease}>
        <MdKeyboardArrowDown />
      </button>
      <p className="addtocart-number">{amount}</p>
      <button className="addtocart-increase" onClick={increase}>
        <MdKeyboardArrowUp />
      </button>
    </div>
  )
}
export default AmountButtons
