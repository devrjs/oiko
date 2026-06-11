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
      className={`h-8 w-8 rounded border border-cyan-500 bg-transparent text-cyan-500 hover:bg-cyan-500 hover:text-black disabled:cursor-default disabled:bg-cyan-500 disabled:text-black`}
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
