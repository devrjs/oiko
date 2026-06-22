import { forwardRef, type InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  label: string
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-1'>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input
          ref={ref}
          id={id}
          autoComplete='off'
          className={error ? 'aria-invalid:border-destructive' : ''}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <span className='text-destructive text-xs'>{error.message}</span>
        )}
      </div>
    )
  }
)

InputWithLabel.displayName = 'InputWithLabel'
