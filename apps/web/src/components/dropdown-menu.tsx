'use client'

import { CheckCircle2, Pencil, PenLine, Trash } from 'lucide-react'
import { useContext, useState } from 'react'
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
  const [erro, set_erro] = useState<string | null>(null)
  const [acao_pendente, set_acao_pendente] = useState<
    'excluir' | 'confirmar' | null
  >(null)

  async function deleteFinance(finance_id: string) {
    set_acao_pendente('excluir')
    set_erro(null)
    try {
      await api.post('/delete/finance', {
        finance_id,
      })

      set_to_update(!to_update)
    } catch (_error) {
      // Sem atualização otimista para reverter: a lista só muda após sucesso.
      // Anuncia a falha em região viva para leitor de tela + toast visual.
      set_erro('Falha ao excluir. Tente novamente.')
    } finally {
      set_acao_pendente(null)
    }
  }

  async function confirmFinance(finance: Finance) {
    set_acao_pendente('confirmar')
    set_erro(null)
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
      // Sem atualização otimista para reverter: a lista só muda após sucesso.
      set_erro('Falha ao confirmar. Tente novamente.')
    } finally {
      set_acao_pendente(null)
    }
  }

  async function deleteCategory(category_id: string) {
    set_acao_pendente('excluir')
    set_erro(null)
    try {
      await api.post('/delete/category', {
        category_id,
      })

      set_to_update(!to_update)
    } catch (_error) {
      // Sem atualização otimista para reverter: a lista só muda após sucesso.
      set_erro('Falha ao excluir categoria. Tente novamente.')
    } finally {
      set_acao_pendente(null)
    }
  }

  return (
    <>
      <ShadcnDropdownMenu>
        <DropdownMenuTrigger
          aria-label='Opções do registro'
          className='ml-auto flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-none bg-muted text-[25px] text-primary outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-1 focus-visible:ring-ring'
        >
          <Pencil aria-hidden='true' />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent side='left'>
            {(finance?.type === 'Contas a pagar' ||
              finance?.type === 'Contas a receber') && (
              <>
                <DropdownMenuItem
                  disabled={acao_pendente !== null}
                  onClick={() => confirmFinance(finance)}
                >
                  <CheckCircle2 size={18} aria-hidden='true' />
                  <span className='pl-2'>
                    {acao_pendente === 'confirmar'
                      ? 'Confirmando…'
                      : 'Confirmar'}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            {type === 'finances' && (
              <Modal type='finances'>
                <button
                  type='button'
                  aria-label={
                    finance?.description
                      ? `Editar ${finance.description}`
                      : 'Editar finança'
                  }
                  onClick={() => set_stage_finance(finance)}
                  className='flex min-h-[32px] w-full items-center gap-2 px-2 py-2 text-xs pointer-coarse:min-h-[44px] pointer-coarse:py-3'
                >
                  <PenLine size={18} aria-hidden='true' />
                  <span className='pl-2'>Editar</span>
                </button>
              </Modal>
            )}

            {type === 'pendencies' && (
              <Modal type='pendencies'>
                <button
                  type='button'
                  aria-label={
                    finance?.description
                      ? `Editar ${finance.description}`
                      : 'Editar pendência'
                  }
                  onClick={() => set_stage_finance(finance)}
                  className='flex min-h-[32px] w-full items-center gap-2 px-2 py-2 text-xs pointer-coarse:min-h-[44px] pointer-coarse:py-3'
                >
                  <PenLine size={18} aria-hidden='true' />
                  <span className='pl-2'>Editar</span>
                </button>
              </Modal>
            )}

            {type === 'category' && (
              <Modal type='category'>
                <button
                  type='button'
                  aria-label={
                    category?.description
                      ? `Editar ${category.description}`
                      : 'Editar categoria'
                  }
                  onClick={() => set_stage_category(category)}
                  className='flex min-h-[32px] w-full items-center gap-2 px-2 py-2 text-xs pointer-coarse:min-h-[44px] pointer-coarse:py-3'
                >
                  <PenLine size={18} aria-hidden='true' />
                  <span className='pl-2'>Editar</span>
                </button>
              </Modal>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant='destructive'
              disabled={acao_pendente !== null}
              onClick={() =>
                type === 'category'
                  ? category && deleteCategory(category.id)
                  : finance && deleteFinance(finance.id)
              }
            >
              <Trash size={18} aria-hidden='true' />
              <span className='pl-2'>
                {acao_pendente === 'excluir' ? 'Excluindo…' : 'Excluir'}
              </span>
            </DropdownMenuItem>
            {erro && (
              <p
                role='alert'
                aria-live='assertive'
                className='px-2 py-2 font-mono text-destructive text-xs'
              >
                {erro}
              </p>
            )}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </ShadcnDropdownMenu>
      {erro && (
        <div
          role='alert'
          aria-live='assertive'
          className='fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 bg-card px-4 py-3 font-mono text-destructive text-xs ring-1 ring-foreground/10'
        >
          <span>{erro}</span>
          <button
            type='button'
            onClick={() => set_erro(null)}
            aria-label='Dispensar erro'
            className='shrink-0 px-2 py-1 text-foreground underline underline-offset-4 outline-none hover:text-primary focus-visible:ring-1 focus-visible:ring-ring'
          >
            Dispensar
          </button>
        </div>
      )}
    </>
  )
}
