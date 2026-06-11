import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`flex h-12 w-full items-center justify-center rounded bg-cyan-500 px-4 font-medium text-black text-md outline-none ring-white transition-colors hover:bg-cyan-400 focus:ring-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
