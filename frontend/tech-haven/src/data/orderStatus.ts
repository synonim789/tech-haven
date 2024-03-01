type OrderStatus = {
  label: string
  value: string
  background: string
}

export const ORDER_STATUS: OrderStatus[] = [
  {
    label: 'Pending',
    value: 'pending',
    background: 'bg-gray-500',
  },
  {
    label: 'Paid',
    value: 'paid',
    background: 'bg-blue-400',
  },
  {
    label: 'In Progress',
    value: 'inProgress',
    background: 'bg-blue-500',
  },
  {
    label: 'In Delivery',
    value: 'inDelivery',
    background: 'bg-yellow-500',
  },
  {
    label: 'Delivered',
    value: 'delivered',
    background: 'bg-green-500',
  },
  {
    label: 'Canceled',
    value: 'canceled',
    background: 'bg-red-500',
  },
]
