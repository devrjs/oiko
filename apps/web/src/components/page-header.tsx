'use client'

import { useContext } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { Modal } from './modal'

interface PageHeaderProps {
  title: string
  add_button?:
    | 'Adicionar Finança'
    | 'Adicionar Pendência'
    | 'Adicionar Categoria'
}

export function PageHeader({ title, add_button }: PageHeaderProps) {
  const { set_stage_finance, set_stage_category } = useContext(FinanceContext)

  return (
    <header className='flex w-full flex-col justify-between gap-3 px-2 sm:h-12 sm:flex-row'>
      <h1 className='whitespace-nowrap text-2xl'>{title}</h1>

      {add_button && (
        <Modal
          type={
            add_button === 'Adicionar Finança'
              ? 'finances'
              : add_button === 'Adicionar Pendência'
                ? 'pendencies'
                : 'category'
          }
        >
          <button
            type='button'
            onClick={() => {
              set_stage_finance(undefined)
              set_stage_category(undefined)
            }}
            className='inline-flex h-12 select-none items-center justify-center rounded-md bg-gray-700 px-4 py-2 font-medium text-base hover:bg-green-500 hover:text-gray-900 focus:outline-none'
          >
            {add_button}
          </button>
        </Modal>
      )}
    </header>
  )
}
