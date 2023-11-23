import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import './AmountButtons.css'

type AmountButtonsPropsType = {
  amount: number
  increase: () => void
  decrease: () => void
}

const AmountButtons = ({
  amount,
  increase,
  decrease,
}: AmountButtonsPropsType) => {
  return (
    <div className="amount-container__amount">
      <button className="amount-decrease" onClick={decrease}>
        <MdKeyboardArrowDown />
      </button>
      <p className="amount-number">{amount}</p>
      <button className="amount-increase" onClick={increase}>
        <MdKeyboardArrowUp />
      </button>
    </div>
  )
}
export default AmountButtons
