'use client'

import {
  createContext,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react'
import type { Category } from '@/hooks/use-categories'
import type { Finance } from '@/hooks/use-finances'

interface FinanceContextType {
  selected_category: string
  set_selected_category: React.Dispatch<SetStateAction<string>>
  stage_finance: Finance | undefined
  set_stage_finance: React.Dispatch<SetStateAction<Finance | undefined>>
  stage_category: Category | undefined
  set_stage_category: React.Dispatch<SetStateAction<Category | undefined>>
  to_update: boolean
  set_to_update: React.Dispatch<SetStateAction<boolean>>
}

export const FinanceContext = createContext({} as FinanceContextType)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [selected_category, set_selected_category] = useState('')
  const [stage_finance, set_stage_finance] = useState<Finance | undefined>(
    undefined
  )
  const [stage_category, set_stage_category] = useState<Category | undefined>(
    undefined
  )
  const [to_update, set_to_update] = useState(false)

  return (
    <FinanceContext.Provider
      value={{
        selected_category,
        set_selected_category,
        stage_finance,
        set_stage_finance,
        stage_category,
        set_stage_category,
        to_update,
        set_to_update,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}
