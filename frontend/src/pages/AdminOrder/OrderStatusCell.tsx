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
      className={`p-3  ${color} w-full rounded-full px-4 py-2 text-center font-bold`}
    >
      {label}
    </div>
  )
}
export default OrderStatusCell
