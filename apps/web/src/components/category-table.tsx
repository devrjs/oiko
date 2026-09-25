'use client'

import dayjs from 'dayjs'
import { memo, useContext, useState } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import type { Category } from '@/hooks/use-categories'
import { useCategories } from '@/hooks/use-categories'
import { DropdownMenu } from './dropdown-menu'
import { Pagination } from './pagination'
import { Search } from './search'
import { Spinner } from './spinner'

const CategoryRow = memo(function CategoryRow({
  category,
}: {
  category: Category
}) {
  return (
    <tr key={category.id} className='h-12 border-b bg-muted/30 text-foreground last:border-0'>
      <td className='min-w-0 max-w-[220px] rounded-none pr-2 pl-3 break-words whitespace-normal sm:max-w-none'>
        {category.description}
      </td>
      <td className='px-2 whitespace-nowrap tabular-nums'>
        <time dateTime={dayjs(category.created_at).toISOString()}>
          {dayjs(category.created_at).format('DD/MM/YYYY')}
        </time>
      </td>
      <td className='rounded-none lg:max-w-[20px]'>
        <DropdownMenu type='category' category={category} />
      </td>
    </tr>
  )
})

export function CategoryTable() {
  const [page, setPage] = useState(1)
  const [search_value, set_search_value] = useState('')
  const { to_update } = useContext(FinanceContext)

  const { data, error, isLoading, dataUpdatedAt } = useCategories(
    page,
    search_value,
    to_update
  )

  return (
    <div className='flex h-full w-full flex-col gap-2 overflow-y-hidden px-2 pt-4 pb-2'>
      <Search set_search_value={set_search_value} />
      {/* Região viva: anuncia atualizações sem remontar a tabela. */}
      <p aria-live='polite' className='sr-only'>
        {data
          ? `Dados atualizados às ${dayjs(dataUpdatedAt).format('HH:mm:ss')}.`
          : 'Carregando registros.'}
      </p>

      <div className='flex h-full w-full flex-col'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
        ) : error ? (
          <div className='flex h-full w-full items-center justify-center'>
            <span className='text-destructive'>Falha ao carregar!</span>
          </div>
        ) : data && (!data.categories || data.categories.length <= 0) ? (
          <div className='flex h-full w-full items-center justify-center text-2xl text-muted-foreground'>
            <span className='rounded-full border border-border p-8'>
              Nenhum registro cadastrado!
            </span>
          </div>
        ) : (
          <div className='w-full overflow-x-auto'>
            <table className='w-full min-w-[480px] border-collapse font-mono text-foreground text-xs'>
              <thead className='text-left'>
                <tr className='border-b'>
                  <th scope='col' className='h-10 pl-3 font-medium'>Descrição</th>
                  <th scope='col' className='h-10 px-2 font-medium whitespace-nowrap'>Data de Criação</th>
                  <th scope='col' className='w-[50px]'>
                    <span className='sr-only'>Ações</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.categories.map(category => (
                  <CategoryRow key={category.id} category={category} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        total_count_of_registers={data?.total_count}
        current_page={page}
        on_page_change={setPage}
      />
    </div>
  )
}
