import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

type Props = {
  amount: number
  increase: () => void
  decrease: () => void
}

const AmountButtons = ({ amount, increase, decrease }: Props) => {
  return (
    <div className="flex items-center">
      <button className="bg-[#405684] text-white p-3" onClick={decrease}>
        <MdKeyboardArrowDown size={24} />
      </button>
      <p className="p-4 text-lg bg-white dark:bg-transparent font-bold  dark:text-slate-400 place-self-center  min-w-[60px] text-center dark:bg-gray-800">
        {amount}
      </p>
      <button className="bg-[#405684] text-white p-3" onClick={increase}>
        <MdKeyboardArrowUp size={24} />
      </button>
    </div>
  )
}
export default AmountButtons
