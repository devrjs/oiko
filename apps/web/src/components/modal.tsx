'use client'

import { cloneElement, isValidElement, type ReactNode, useContext, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { FinanceContext } from '@/contexts/finance-context'
import { CategoryForm } from './category-form'
import { FinanceForm } from './finance-form'

interface ModalProps {
  type: 'finances' | 'pendencies' | 'category'
  /**
   * CTAs de ADICIONAR devem declarar isto: limpa qualquer stage de edicao
   * esquecido de outra rota, que transformaria o "adicionar" em PUT no
   * registro velho. Gatilhos de editar (dropdown-menu) nao passam isto —
   * eles proprio setam o stage no onClick.
   */
  reset_stage?: boolean
  children: ReactNode
}

export function Modal({ type, reset_stage, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { set_stage_finance, set_stage_category } = useContext(FinanceContext)

  const triggerWithHandler = isValidElement(children)
    ? (() => {
        const originalOnClick = (
          children as React.ReactElement<{
            onClick?: (...args: unknown[]) => void
          }>
        ).props.onClick
        return cloneElement(
          children as React.ReactElement,
          {
            onClick: (e: React.MouseEvent) => {
              originalOnClick?.(e)
              if (reset_stage) {
                set_stage_finance(undefined)
                set_stage_category(undefined)
              }
              setIsOpen(true)
            },
          } as React.Attributes
        )
      })()
    : children

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {triggerWithHandler}
      <DialogContent className='max-w-[380px] px-6 pt-5 pb-6'>
        <DialogTitle className='mb-2 font-medium text-lg'>
          {type === 'category' ? 'Adicionar Categoria' : 'Adicionar Finança'}
        </DialogTitle>
        {type === 'finances' && (
          <FinanceForm type='finances' setIsOpen={setIsOpen} />
        )}
        {type === 'pendencies' && (
          <FinanceForm type='pendencies' setIsOpen={setIsOpen} />
        )}
        {type === 'category' && <CategoryForm setIsOpen={setIsOpen} />}
      </DialogContent>
    </Dialog>
  )
}
