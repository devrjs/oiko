'use client'

import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
            <span className='text-destructive'>Falha ao carregar!</span>
          </div>
        ) : data && (!data.finances || data.finances.length <= 0) ? (
          <div className='flex h-full w-full items-center justify-center text-2xl text-muted-foreground'>
            <span className='rounded-full border border-border p-8'>
              Nenhum registro cadastrado!
            </span>
          </div>
        ) : (
          <Table key={dataUpdatedAt}>
            <TableHeader>
              <TableRow>
                <TableHead className='pl-3'>Descrição</TableHead>
                <TableHead className='px-2'>Valor</TableHead>
                <TableHead className='px-2'>Tipo</TableHead>
                <TableHead className='px-2'>Data</TableHead>
                <TableHead className='w-[50px]' />
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.finances.map(finance => {
                const typeColor =
                  finance.type === 'Saída'
                    ? 'text-destructive'
                    : finance.type === 'Entrada'
                      ? 'text-foreground'
                      : finance.type === 'Contas a pagar'
                        ? 'text-muted-foreground'
                        : 'text-primary'

                return (
                  <TableRow key={finance.id} className='bg-muted/30'>
                    <TableCell className='pr-2 pl-3 font-medium'>
                      {finance.description}
                    </TableCell>
                    <TableCell className={`px-2 ${typeColor}`}>
                      {convertToBRL(
                        finance.type === 'Saída' ||
                          finance.type === 'Contas a pagar'
                          ? finance.amount * -1
                          : finance.amount
                      )}
                    </TableCell>
                    <TableCell className={`px-2 ${typeColor}`}>
                      {finance.type}
                    </TableCell>
                    <TableCell className='px-2'>
                      {dayjs(finance.date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className='w-[50px]'>
                      <DropdownMenu type={type} finance={finance} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
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
