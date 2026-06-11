'use client'

import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { useCategories } from '@/hooks/use-categories'
import { DropdownMenu } from './dropdown-menu'
import { Pagination } from './pagination'
import { Search } from './search'
import { Spinner } from './spinner'

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

      <div className='flex h-full w-full flex-col'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
        ) : error ? (
          <div className='flex h-full w-full items-center justify-center'>
            <span>Falha ao carregar!</span>
          </div>
        ) : data && (!data.categories || data.categories.length <= 0) ? (
          <div className='flex h-full w-full items-center justify-center text-2xl text-gray-500'>
            <span className='rounded-full border border-gray-800 p-8'>
              Nenhum registro cadastrado!
            </span>
          </div>
        ) : (
          <table
            className='w-full border-separate border-spacing-y-2 text-gray-400'
            key={dataUpdatedAt}
          >
            <thead className='text-left'>
              <tr>
                <th className='pl-3'>Descrição</th>
                <th className='px-2'>Data de Criação</th>
                <th className='w-[50px]' />
              </tr>
            </thead>

            <tbody>
              {data?.categories.map(category => {
                return (
                  <tr
                    key={category.id}
                    className='h-12 whitespace-nowrap bg-gray-700 text-gray-200'
                  >
                    <td className='rounded-tl-lg rounded-bl-lg pr-2 pl-3'>
                      {category.description}
                    </td>
                    <td className='px-2'>
                      {dayjs(category.created_at).format('DD/MM/YYYY')}
                    </td>
                    <td className='rounded-tr-lg rounded-br-lg lg:max-w-[20px]'>
                      <DropdownMenu type='category' category={category} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
