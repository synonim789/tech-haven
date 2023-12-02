import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

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
    <div className="flex">
      <button
        className="bg-[#120b90] text-white text-[20px] font-bold p-3"
        onClick={decrease}
      >
        <MdKeyboardArrowDown />
      </button>
      <p className="p-4 bg-white text-[20px] min-w-[60px] text-center">
        {amount}
      </p>
      <button
        className="bg-[#120b90] text-white text-[20px] font-bold p-3"
        onClick={increase}
      >
        <MdKeyboardArrowUp />
      </button>
    </div>
  )
}
export default AmountButtons
