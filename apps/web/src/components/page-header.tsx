'use client'

import { Button } from '@/components/ui/button'
import { Modal } from './modal'

interface PageHeaderProps {
  title: string
  add_button?:
    | 'Adicionar Finança'
    | 'Adicionar Pendência'
    | 'Adicionar Categoria'
}

export function PageHeader({ title, add_button }: PageHeaderProps) {
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
          reset_stage
        >
          <Button type='button'>{add_button}</Button>
        </Modal>
      )}
    </header>
  )
}
