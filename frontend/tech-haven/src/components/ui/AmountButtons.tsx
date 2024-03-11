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
      <button className="bg-[#405684] text-white p-3" onClick={decrease}>
        <MdKeyboardArrowDown size={20} />
      </button>
      <p className="p-4 text-lg bg-white dark:bg-transparent font-bold  dark:text-slate-400  min-w-[60px] text-center dark:bg-gray-800">
        {amount}
      </p>
      <button className="bg-[#405684] text-white p-3" onClick={increase}>
        <MdKeyboardArrowUp size={20} />
      </button>
    </div>
  )
}
export default AmountButtons
