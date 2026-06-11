import { PaginationItem } from './pagination-item'

const siblingsCount = 2

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
}

interface PaginationProps {
  total_count_of_registers: number | undefined
  registers_per_page?: number
  current_page?: number
  on_page_change: (page: number) => void
}

export function Pagination({
  total_count_of_registers,
  registers_per_page = 10,
  current_page = 1,
  on_page_change,
}: PaginationProps) {
  const lastPage = Math.ceil(Number(total_count_of_registers) / registers_per_page)
  const previousPages =
    current_page > 1
      ? generatePagesArray(current_page - 1 - siblingsCount, current_page - 1)
      : []
  const nextPages =
    current_page < lastPage
      ? generatePagesArray(
          current_page,
          Math.min(current_page + siblingsCount, lastPage)
        )
      : []

  return (
    <nav className='flex max-h-[56px] min-h-[56px] items-center justify-center gap-1'>
      {current_page > 1 + siblingsCount && (
        <>
          <PaginationItem on_page_change={on_page_change} number={1} />
          {current_page > 2 + siblingsCount && (
            <span className='text-cyan-500'>{'<<'}</span>
          )}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map(page => {
          return (
            <PaginationItem
              on_page_change={on_page_change}
              key={page}
              number={page}
            />
          )
        })}

      <PaginationItem
        on_page_change={on_page_change}
        number={current_page}
        isCurrent
      />

      {nextPages.length > 0 &&
        nextPages.map(page => {
          return (
            <PaginationItem
              on_page_change={on_page_change}
              key={page}
              number={page}
            />
          )
        })}

      {current_page + siblingsCount < lastPage && (
        <>
          {current_page + 1 + siblingsCount < lastPage && (
            <span className='text-cyan-500'>{'>>'}</span>
          )}
          <PaginationItem on_page_change={on_page_change} number={lastPage} />
        </>
      )}
    </nav>
  )
}
