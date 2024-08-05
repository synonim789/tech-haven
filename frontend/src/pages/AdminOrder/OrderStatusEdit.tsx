import { ChangeEvent, useEffect, useState } from 'react'
import { ORDER_STATUS } from '../../data/orderStatus'

type Props = {
  editOrderInfo: (id: string, status: string) => void
  name: string
  id: string
}

const OrderStatusEdit = ({ editOrderInfo, name, id }: Props) => {
  const initialValue = name
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    editOrderInfo(id, e.target.value)
  }

  return (
    <select
      className="rounded-md border-2 border-solid border-slate-900 px-3 py-2 shadow-lg outline-none placeholder:capitalize placeholder:text-slate-900 dark:bg-transparent dark:text-gray-400"
      onChange={onSelectChange}
      value={value}
    >
      {ORDER_STATUS.map((o) => (
        <option value={o.value} key={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
export default OrderStatusEdit
