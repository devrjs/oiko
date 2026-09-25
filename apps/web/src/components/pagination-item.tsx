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
      type='button'
      aria-label={
        isCurrent
          ? `Página atual, página ${number}`
          : `Ir para a página ${number}`
      }
      aria-current={isCurrent ? 'page' : undefined}
      className={`inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded border bg-transparent text-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring pointer-coarse:h-11 pointer-coarse:min-h-[44px] pointer-coarse:w-11 pointer-coarse:min-w-[44px] ${
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
