'use client'

import { CheckCircle2, Pencil, PenLine, Trash } from 'lucide-react'
import { useContext } from 'react'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu as ShadcnDropdownMenu,
} from '@/components/ui/dropdown-menu'
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
    <ShadcnDropdownMenu>
      <DropdownMenuTrigger>
        <button
          type='button'
          className='ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-[25px] text-primary outline-none hover:bg-primary hover:text-primary-foreground'
        >
          <Pencil />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent side='left'>
          {(finance?.type === 'Contas a pagar' ||
            finance?.type === 'Contas a receber') && (
            <>
              <DropdownMenuItem onClick={() => confirmFinance(finance)}>
                <CheckCircle2 size={18} />
                <span className='pl-2'>Confirmar</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {type === 'finances' && (
            <Modal type='finances'>
              <button
                type='button'
                onClick={() => set_stage_finance(finance)}
                className='flex w-full items-center gap-2 px-2 py-2 text-xs'
              >
                <PenLine size={18} />
                <span className='pl-2'>Editar</span>
              </button>
            </Modal>
          )}

          {type === 'pendencies' && (
            <Modal type='pendencies'>
              <button
                type='button'
                onClick={() => set_stage_finance(finance)}
                className='flex w-full items-center gap-2 px-2 py-2 text-xs'
              >
                <PenLine size={18} />
                <span className='pl-2'>Editar</span>
              </button>
            </Modal>
          )}

          {type === 'category' && (
            <Modal type='category'>
              <button
                type='button'
                onClick={() => set_stage_category(category)}
                className='flex w-full items-center gap-2 px-2 py-2 text-xs'
              >
                <PenLine size={18} />
                <span className='pl-2'>Editar</span>
              </button>
            </Modal>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant='destructive'
            onClick={() =>
              type === 'category'
                ? category && deleteCategory(category.id)
                : finance && deleteFinance(finance.id)
            }
          >
            <Trash size={18} />
            <span className='pl-2'>Excluir</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </ShadcnDropdownMenu>
  )
}
