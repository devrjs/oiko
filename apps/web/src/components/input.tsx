import { forwardRef, type InputHTMLAttributes, type ReactElement } from 'react'
import type { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement
  error?: FieldError
  bg_color?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, bg_color, ...props }, ref) => {
    return (
      <div
        className={`flex h-12 w-full items-center gap-2 rounded pr-2 pl-3 ${
          bg_color ?? 'bg-gray-900'
        } focus-within:ring-2 ${error ? 'redFocus ring-red-500' : 'cyanFocus ring-cyan-400'}`}
      >
        {icon && (
          <span className='flex h-full w-full max-w-[30px] items-center justify-center text-gray-400'>
            {icon}
          </span>
        )}

        <input
          ref={ref}
          className={`webkit-autofill h-12 w-full bg-transparent outline-none placeholder:text-gray-400`}
          {...props}
        />
      </div>
    )
  }
)
