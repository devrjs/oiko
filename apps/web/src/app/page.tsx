import Image from 'next/image'
import Link from 'next/link'
import { SignInForm } from '@/components/sign-in-form'
import illustration from '../assets/illustration.svg'

export default function SignIn() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-900'>
      <div className='flex max-w-5xl flex-1 flex-col items-center justify-center gap-6 sm:flex-row sm:p-8 md:justify-between'>
        <div className='hidden w-full flex-col md:flex'>
          <Image
            alt='Imagem de ilustração'
            src={illustration}
            width='0'
            height='0'
            className='h-auto w-80'
            priority
          />
          <h1 className='mt-6 font-bold text-gray-200 text-xl'>
            Tenha o controle de seu dinheiro.
          </h1>
          <p className='mt-1 text-gray-400'>Faça login e começe a usar!</p>
        </div>

        <div className='flex w-full flex-col items-center justify-center overflow-hidden bg-gray-800 px-6 pt-4 pb-8 sm:max-w-sm sm:rounded-xl'>
          <SignInForm />

          <div className='flex flex-col items-center gap-2'>
            <Link
              href='/signup'
              className='text-center text-gray-200 text-sm hover:text-white'
            >
              Não possui conta?{' '}
              <span className='text-cyan-400 hover:underline'>Registre-se</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
