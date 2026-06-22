import { forwardRef, type InputHTMLAttributes, type ReactElement } from 'react'
import type { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement
  rightElement?: ReactElement
  error?: FieldError
  bg_color?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, rightElement, error, bg_color, ...props }, ref) => {
    return (
      <div
        className={`flex h-12 w-full items-center gap-2 rounded pr-2 pl-3 ${
          bg_color ?? 'bg-muted'
        } focus-within:ring-2 ${error ? 'ring-destructive' : 'ring-ring'}`}
      >
        {icon && (
          <span className='flex h-full w-full max-w-[30px] items-center justify-center text-muted-foreground'>
            {icon}
          </span>
        )}

        <input
          ref={ref}
          className='webkit-autofill h-12 w-full bg-transparent outline-none placeholder:text-muted-foreground'
          {...props}
        />

        {rightElement && (
          <div className='flex h-full items-center justify-center text-muted-foreground'>
            {rightElement}
          </div>
        )}
      </div>
    )
  }
)
