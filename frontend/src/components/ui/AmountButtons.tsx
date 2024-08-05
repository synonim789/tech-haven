import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

type Props = {
  amount: number
  increase: () => void
  decrease: () => void
}

const AmountButtons = ({ amount, increase, decrease }: Props) => {
  return (
    <div className="flex items-center">
      <button className="bg-[#405684] p-3 text-white" onClick={decrease}>
        <MdKeyboardArrowDown size={24} />
      </button>
      <p className="min-w-[60px] place-self-center bg-transparent p-4 text-center text-lg font-bold dark:text-slate-400">
        {amount}
      </p>
      <button className="bg-[#405684] p-3 text-white" onClick={increase}>
        <MdKeyboardArrowUp size={24} />
      </button>
    </div>
  )
}
export default AmountButtons
