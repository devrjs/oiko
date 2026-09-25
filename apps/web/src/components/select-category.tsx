'use client'

import { useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FinanceContext } from '@/contexts/finance-context'
import { useSelectCategories } from '@/hooks/use-select-categories'

export function SelectCategory() {
  const { selected_category, set_selected_category, to_update } =
    useContext(FinanceContext)
  const { data } = useSelectCategories(to_update)

  return (
    <Select
      value={selected_category || 'all'}
      onValueChange={(value: string | null) => {
        set_selected_category(value === 'all' || value === null ? '' : value)
      }}
    >
      <SelectTrigger className='w-48' aria-label='Filtrar finanças por categoria'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Geral</SelectItem>
        {data?.categories.map(category => (
          <SelectItem key={category.id} value={category.id}>
            {category.description}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
