import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`flex h-12 w-full items-center justify-center rounded bg-primary px-4 font-medium text-md text-primary-foreground outline-none ring-ring transition-colors hover:bg-primary/80 focus:ring-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
