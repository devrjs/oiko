'use client'

import { Transition, TransitionChild } from '@headlessui/react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { CategoryForm } from './category-form'
import { FinanceForm } from './finance-form'

interface ModalProps {
  type: 'finances' | 'pendencies' | 'category'
  children: ReactNode
}

export function Modal({ type, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition show={isOpen}>
          <div className='relative'>
            {/* backdrop */}
            <TransitionChild
              as='div'
              className='fixed inset-0 z-50'
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <DialogPrimitive.Overlay
                forceMount
                className='fixed inset-0 bg-black/50'
              />
            </TransitionChild>

            {/* panel */}
            <TransitionChild
              as='div'
              className='fixed inset-0 z-50 flex items-center justify-center p-4'
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPrimitive.Content
                forceMount
                className='max-h-screen w-full max-w-[380px] overflow-auto bg-gray-800 px-6 pt-5 pb-6 shadow-black/25 shadow-lg sm:rounded-3xl'
              >
                <DialogPrimitive.Title className='font-medium text-gray-900 text-xl dark:text-gray-100'>
                  {type === 'category'
                    ? 'Adicionar Categoria'
                    : 'Adicionar Finança'}
                </DialogPrimitive.Title>

                {type === 'finances' && (
                  <FinanceForm type='finances' setIsOpen={setIsOpen} />
                )}
                {type === 'pendencies' && (
                  <FinanceForm type='pendencies' setIsOpen={setIsOpen} />
                )}
                {type === 'category' && <CategoryForm setIsOpen={setIsOpen} />}

                <DialogPrimitive.Close className='absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1'>
                  <X className='h-auto w-7 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400' />
                </DialogPrimitive.Close>
              </DialogPrimitive.Content>
            </TransitionChild>
          </div>
        </Transition>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
