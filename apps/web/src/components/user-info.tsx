'use client'

import { useContext } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { useUser } from '@/hooks/use-user'

export function UserInfo() {
  const { to_update } = useContext(FinanceContext)
  const { data } = useUser(to_update)

  return (
    <div className='hidden flex-col items-end sm:flex'>
      <span className='font-mono text-foreground text-xs'>{data?.user.name}</span>
      <span className='font-mono text-muted-foreground text-xs tracking-wider'>
        @{data?.user.username}
      </span>
    </div>
  )
}
