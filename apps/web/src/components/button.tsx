import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 font-medium text-primary-foreground text-sm shadow-sm outline-none ring-ring transition-all hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
