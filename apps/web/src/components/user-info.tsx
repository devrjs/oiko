'use client'

import { useContext } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { useUser } from '@/hooks/use-user'

export function UserInfo() {
  const { to_update } = useContext(FinanceContext)
  const { data, dataUpdatedAt } = useUser(to_update)

  return (
    <div className='hidden flex-col items-end sm:flex' key={dataUpdatedAt}>
      <span className='text-[11pt] text-gray-300'>{data?.user.name}</span>
      <span className='text-[10pt] text-gray-400'>@{data?.user.username}</span>
    </div>
  )
}
