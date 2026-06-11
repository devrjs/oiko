'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useContext } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { useSelectCategories } from '@/hooks/use-select-categories'

export function SelectCategory() {
  const { selected_category, set_selected_category, to_update } =
    useContext(FinanceContext)
  const { data, dataUpdatedAt } = useSelectCategories(to_update)

  return (
    <SelectPrimitive.Root
      value={selected_category || 'all'}
      onValueChange={value => {
        set_selected_category(value === 'all' ? '' : value)
      }}
      key={dataUpdatedAt}
    >
      <SelectPrimitive.Trigger asChild aria-label='Category'>
        <button
          type='button'
          className='inline-flex select-none items-center justify-center rounded-md bg-gray-700 px-4 py-2 font-medium text-base focus:outline-none'
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className='ml-2'>
            <ChevronDown size={20} />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Content className='overflow-hidden rounded-lg bg-gray-700'>
        <SelectPrimitive.ScrollUpButton className='flex items-center justify-center bg-linear-to-b from-gray-900 text-gray-700 dark:text-gray-300'>
          <ChevronUp />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport className='rounded-lg bg-white p-2 shadow-lg dark:bg-gray-700'>
          <SelectPrimitive.Group>
            <SelectPrimitive.Item
              value='all'
              className={
                'relative flex cursor-default items-center rounded-md px-8 py-2 font-medium text-base text-gray-700 outline-none focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-cyan-600 dark:focus:text-gray-100'
              }
            >
              <SelectPrimitive.ItemText>Geral</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                <Check size={15} />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>

            {data?.categories.map(category => (
              <SelectPrimitive.Item
                key={category.id}
                value={category.id}
                className={
                  'relative flex cursor-default items-center rounded-md px-8 py-2 font-medium text-base text-gray-700 outline-none focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-cyan-600 dark:focus:text-gray-100'
                }
              >
                <SelectPrimitive.ItemText>
                  {category.description}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                  <Check size={15} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton className='flex items-center justify-center bg-linear-to-t from-gray-900 text-gray-700 dark:text-gray-300'>
          <ChevronDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}
