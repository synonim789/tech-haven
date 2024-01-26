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
        className="bg-[#405684] text-white text-[20px] font-bold p-3"
        onClick={decrease}
      >
        <MdKeyboardArrowDown />
      </button>
      <p className="p-4 bg-white dark:bg-transparent dark:border-y dark:border-[#405684] dark:text-slate-400 border-2 text-[20px] min-w-[60px] text-center">
        {amount}
      </p>
      <button
        className="bg-[#405684] text-white text-[20px] font-bold p-3"
        onClick={increase}
      >
        <MdKeyboardArrowUp />
      </button>
    </div>
  )
}
export default AmountButtons
