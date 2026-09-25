import { forwardRef, type InputHTMLAttributes, useId } from 'react'
import type { FieldError } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  label: string
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    { label, error, id, 'aria-describedby': ariaDescribedBy, ...props },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id ?? `field-${generatedId.replace(/:/g, '')}`
    const errorId = `${inputId}-error`
    return (
      <div className='flex flex-col gap-1'>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          ref={ref}
          id={inputId}
          autoComplete='off'
          className={error ? 'aria-invalid:border-destructive' : ''}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : ariaDescribedBy}
          {...props}
        />
        {error && (
          <span
            id={errorId}
            role='alert'
            aria-live='assertive'
            className='text-destructive text-xs'
          >
            {error.message}
          </span>
        )}
      </div>
    )
  }
)

InputWithLabel.displayName = 'InputWithLabel'
