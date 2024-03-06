type OrderStatus = {
  label: string
  value: string
  background: string
}

export const ORDER_STATUS: OrderStatus[] = [
  {
    label: 'Pending',
    value: 'pending',
    background: 'bg-gray-300 text-gray-500',
  },
  {
    label: 'Paid',
    value: 'paid',
    background: 'bg-blue-200 text-blue-400',
  },
  {
    label: 'In Progress',
    value: 'inProgress',
    background: 'bg-blue-300 text-blue-500',
  },
  {
    label: 'In Delivery',
    value: 'inDelivery',
    background: 'bg-yellow-200 text-yellow-500',
  },
  {
    label: 'Delivered',
    value: 'delivered',
    background: 'bg-green-300 text-green-500',
  },
  {
    label: 'Canceled',
    value: 'canceled',
    background: 'bg-red-300 text-red-500',
  },
]
