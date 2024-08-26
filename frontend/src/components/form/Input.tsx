import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'rounded-xl border-2 border-solid border-gray-300 px-3 py-2 shadow-lg outline-none placeholder:capitalize placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-80 dark:border-gray-700 dark:bg-transparent dark:text-gray-400 flex w-full text-[20px] font-semibold',
          {
            '!border-red-400 !placeholder-red-400': error,
          },
        )}
        {...props}
      />
    )
  },
)

export default Input
