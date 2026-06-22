'use client'

import { cloneElement, isValidElement, type ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { CategoryForm } from './category-form'
import { FinanceForm } from './finance-form'

interface ModalProps {
  type: 'finances' | 'pendencies' | 'category'
  children: ReactNode
}

export function Modal({ type, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

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
