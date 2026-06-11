'use client'

import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { convertToBRL } from '@/hooks/use-convert-to-brl'
import { useFinances } from '@/hooks/use-finances'
import { usePendencies } from '@/hooks/use-pendencies'
import { DropdownMenu } from './dropdown-menu'
import { Pagination } from './pagination'
import { Search } from './search'
import { Spinner } from './spinner'

interface FinanceTableProps {
  type: 'finances' | 'pendencies'
}

export function FinanceTable({ type }: FinanceTableProps) {
  const [page, setPage] = useState(1)
  const [search_value, set_search_value] = useState('')
  const { selected_category, to_update } = useContext(FinanceContext)

  const finances_result = useFinances(
    page,
    search_value,
    selected_category,
    to_update
  )
  const pendencies_result = usePendencies(
    page,
    search_value,
    selected_category,
    to_update
  )

  const { data, error, isLoading, dataUpdatedAt } =
    type === 'finances' ? finances_result : pendencies_result

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
        ) : data && (!data.finances || data.finances.length <= 0) ? (
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
                <th className='px-2'>Valor</th>
                <th className='px-2'>Tipo</th>
                <th className='px-2'>Data</th>
                <th className='w-[50px]' />
              </tr>
            </thead>

            <tbody>
              {data?.finances.map(finance => {
                return (
                  <tr
                    key={finance.id}
                    className='h-12 whitespace-nowrap bg-gray-700 text-gray-200'
                  >
                    <td className='rounded-tl-lg rounded-bl-lg pr-2 pl-3'>
                      {finance.description}
                    </td>
                    <td
                      className={`px-2 ${finance.type === 'Saída' && 'text-red-500'}
                    ${finance.type === 'Entrada' && 'text-green-500'}
                    ${finance.type === 'Contas a pagar' && 'text-orange-500'}
                  ${finance.type === 'Contas a receber' && 'text-cyan-500'}`}
                    >
                      {convertToBRL(
                        finance.type === 'Saída' ||
                          finance.type === 'Contas a pagar'
                          ? finance.amount * -1
                          : finance.amount
                      )}
                    </td>
                    <td
                      className={`px-2 ${finance.type === 'Saída' && 'text-red-500'}
                      ${finance.type === 'Entrada' && 'text-green-500'}
                    ${finance.type === 'Contas a pagar' && 'text-orange-500'}
                    ${finance.type === 'Contas a receber' && 'text-cyan-500'}`}
                    >
                      {finance.type}
                    </td>
                    <td className='px-2'>
                      {dayjs(finance.date).format('DD/MM/YYYY')}
                    </td>
                    <td className='rounded-tr-lg rounded-br-lg lg:max-w-[20px]'>
                      <DropdownMenu type={type} finance={finance} />
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
