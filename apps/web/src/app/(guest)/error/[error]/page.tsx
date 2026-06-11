'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ErrorPage() {
  const [message, setMessage] = useState('')
  const params = useParams()
  const error = params.error

  useEffect(() => {
    if (error === '400') {
      setMessage('Link invalido!')
    }

    if (error === '401') {
      setMessage('Link expirado!')
    }
  }, [error])

  return (
    <div className='flex w-[28rem] flex-col justify-center gap-6 rounded-xl bg-gray-800 px-8 pt-6 pb-8'>
      <span className='text-2xl text-orange-500'>{message}</span>
    </div>
  )
}
