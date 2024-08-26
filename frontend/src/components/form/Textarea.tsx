import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | undefined
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'h-[200px] resize-none rounded-xl border-2 border-solid border-gray-300 px-3 py-2 shadow-lg outline-none placeholder:capitalize placeholder:text-slate-500 dark:border-gray-700 dark:bg-transparent dark:text-gray-400 w-full text-[20px] font-semibold',
          {
            '!border-red-400': error,
          },
          className,
        )}
        ref={ref}
        {...props}
      ></textarea>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
