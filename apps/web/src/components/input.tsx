import { forwardRef, type InputHTMLAttributes, type ReactElement } from 'react'
import type { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement
  rightElement?: ReactElement
  error?: FieldError
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, rightElement, error, ...props }, ref) => {
    return (
      <div
        className={`group/input flex h-11 w-full items-center gap-2 rounded-lg border pr-2 pl-3 transition-colors ${
          error
            ? 'border-destructive/60 bg-destructive/5'
            : 'border-border bg-muted/50 focus-within:border-foreground/30 focus-within:bg-background hover:border-border hover:bg-muted'
        } focus-within:ring-2 focus-within:ring-ring/40`}
      >
        {icon && (
          <span
            aria-hidden='true'
            className={`flex h-full w-full max-w-[20px] items-center justify-center transition-colors ${
              error
                ? 'text-destructive'
                : 'text-muted-foreground group-focus-within/input:text-foreground'
            }`}
          >
            {icon}
          </span>
        )}

        <input
          ref={ref}
          aria-invalid={!!error}
          className='webkit-autofill h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground'
          // Gerenciadores de senha (ex.: o embutido do Vivaldi) injetam
          // atributos como style="caret-color: transparent" nos campos de
          // login antes da hidratação. Isso gera mismatch de hidratação,
          // que no dev faz o Fast Refresh cair em full reload em loop
          // (a página "pisca"). suppressHydrationWarning é o padrão para
          // campos tocados por extensões.
          suppressHydrationWarning
          {...props}
        />

        {rightElement && (
          <div className='flex h-full items-center justify-center text-muted-foreground transition-colors hover:text-foreground'>
            {rightElement}
          </div>
        )}
      </div>
    )
  }
)
