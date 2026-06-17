'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckCircle2, Pencil, PenLine, Trash } from 'lucide-react'
import { useContext } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import type { Category } from '@/hooks/use-categories'
import type { Finance } from '@/hooks/use-finances'
import { api } from '@/lib/api'
import { Modal } from './modal'

interface DropdownMenuProps {
  finance?: Finance
  category?: Category
  type: 'finances' | 'pendencies' | 'category'
}

export function DropdownMenu({ finance, category, type }: DropdownMenuProps) {
  const { set_stage_finance, set_stage_category, set_to_update, to_update } =
    useContext(FinanceContext)

  async function deleteFinance(finance_id: string) {
    try {
      await api.post('/delete/finance', {
        finance_id,
      })

      set_to_update(!to_update)
    } catch (_error) {
      // handle error
    }
  }

  async function confirmFinance(finance: Finance) {
    try {
      await api.post('/edit/finance', {
        finance_id: finance.id,
        description: finance.description,
        amount: finance.amount,
        date: finance.date,
        type: finance.type === 'Contas a pagar' ? 'Saída' : 'Entrada',
      })

      set_to_update(!to_update)
    } catch (_error) {
      // handle error
    }
  }

  async function deleteCategory(category_id: string) {
    try {
      await api.post('/delete/category', {
        category_id,
      })

      set_to_update(!to_update)
    } catch (_error) {
      // handle error
    }
  }

  return (
    <div className='relative inline-block text-left'>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            type='button'
            className='ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-[25px] text-cyan-500 outline-none hover:bg-cyan-500 hover:text-gray-900'
          >
            <Pencil />
          </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            side='left'
            className='flex flex-col rounded-lg bg-gray-800 px-1.5 py-1 shadow-md'
          >
            {(finance?.type === 'Contas a pagar' ||
              finance?.type === 'Contas a receber') && (
              <>
                <DropdownMenuPrimitive.Item
                  onClick={() => confirmFinance(finance)}
                  className='flex cursor-default select-none items-center rounded-md px-2 py-2 text-gray-300 text-md outline-none hover:bg-cyan-600 hover:text-gray-100'
                >
                  <CheckCircle2 size={22} />
                  <span className='pl-4'>Confirmar</span>
                </DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Separator className='my-1 h-px bg-gray-700' />
              </>
            )}

            {type === 'finances' && (
              <Modal type='finances'>
                <button
                  type='button'
                  onClick={() => set_stage_finance(finance)}
                  className='flex cursor-default select-none items-center rounded-md px-2 py-2 text-gray-300 text-md outline-none hover:bg-cyan-600 hover:text-gray-100'
                >
                  <PenLine size={22} />
                  <span className='pl-4'>Editar</span>
                </button>
              </Modal>
            )}

            {type === 'pendencies' && (
              <Modal type='pendencies'>
                <button
                  type='button'
                  onClick={() => set_stage_finance(finance)}
                  className='flex cursor-default select-none items-center rounded-md px-2 py-2 text-gray-300 text-md outline-none hover:bg-cyan-600 hover:text-gray-100'
                >
                  <PenLine size={22} />
                  <span className='pl-4'>Editar</span>
                </button>
              </Modal>
            )}

            {type === 'category' && (
              <Modal type='category'>
                <button
                  type='button'
                  onClick={() => set_stage_category(category)}
                  className='flex cursor-default select-none items-center rounded-md px-2 py-2 text-gray-300 text-md outline-none hover:bg-cyan-600 hover:text-gray-100'
                >
                  <PenLine size={22} />
                  <span className='pl-4'>Editar</span>
                </button>
              </Modal>
            )}

            <DropdownMenuPrimitive.Separator className='my-1 h-px bg-gray-700' />

            <DropdownMenuPrimitive.Item
              onClick={() =>
                type === 'category'
                  ? category && deleteCategory(category.id)
                  : finance && deleteFinance(finance.id)
              }
              className='flex cursor-default select-none items-center rounded-md px-2 py-2 text-gray-300 text-md outline-none hover:bg-cyan-600 hover:text-gray-100'
            >
              <Trash size={22} />
              <span className='pl-4'>Excluir</span>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Arrow className='fill-gray-800' />
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  )
}
