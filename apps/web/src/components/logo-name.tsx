import Image from 'next/image'
import logo from '../assets/logo.svg'

export function LogoName() {
  return (
    <header className='mb-2 flex h-14 items-center overflow-hidden'>
      <span className='flex min-w-[55px] items-center'>
        <Image
          alt='Logo do Oiko'
          src={logo}
          width='0'
          height='0'
          style={{ width: '2rem', height: 'auto' }}
          priority
        />
      </span>
      <span className='whitespace-nowrap font-bold text-md'>Oiko</span>
    </header>
  )
}
