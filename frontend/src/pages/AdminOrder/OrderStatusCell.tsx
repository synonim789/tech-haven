import { CellContext } from '@tanstack/react-table'
import { ORDER_STATUS } from '../../data/orderStatus'
import { OrderType } from '../../types'

type Props = {
  value: CellContext<OrderType, string>
}

const OrderStatusCell = ({ value }: Props) => {
  const color = ORDER_STATUS.find(
    (o) => o.value === value.getValue()
  )?.background

  const label = ORDER_STATUS.find((o) => o.value === value.getValue())?.label

  return (
    <div
      className={`p-2 before:content-[attr(data-cell)] before:mr-1 before:font-bold md:before:content-none ${color} font-bold px-4 py-2 rounded-full text-center w-full`}
    >
      {label}
    </div>
  )
}
export default OrderStatusCell
