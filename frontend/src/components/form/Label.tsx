import { LabelHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ className, ...props }: Props) => {
  return (
    <label
      htmlFor=""
      className={cn('dark:text-gray-500 font-semibold capitalize', className)}
      {...props}
    />
  )
}
export default Label
