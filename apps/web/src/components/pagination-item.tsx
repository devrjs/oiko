import type { ButtonHTMLAttributes } from 'react'

interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  number: number
  isCurrent?: boolean
  on_page_change: (page: number) => void
}

export function PaginationItem({
  number,
  isCurrent,
  on_page_change,
  ...props
}: PaginationItemProps) {
  return (
    <button
      className={`h-8 w-8 rounded border bg-transparent text-sm transition-colors ${
        isCurrent
          ? 'cursor-default border-primary bg-primary text-primary-foreground'
          : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
      }`}
      disabled={isCurrent}
      onClick={() => {
        !isCurrent && on_page_change(number)
      }}
      {...props}
    >
      {number}
    </button>
  )
}
