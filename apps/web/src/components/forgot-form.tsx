'use client'

import { useState } from 'react'

export function ForgotForm() {
  const [message] = useState('Funcionalidade de recuperação desabilitada.')

  return (
    <div className='flex h-full w-full flex-col justify-center gap-2'>
      <p className='text-center text-gray-400'>
        {message}
      </p>
    </div>
  )
}
