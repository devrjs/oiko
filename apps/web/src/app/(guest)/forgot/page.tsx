import { ForgotForm } from '@/components/forgot-form'

export default function Forgot() {
  return (
    <div className='flex w-[28rem] flex-col justify-center gap-6 rounded-xl bg-gray-800 px-8 pt-6 pb-8'>
      <h1 className='font-semibold text-xl'>Recuperação de senha</h1>

      <ForgotForm />
    </div>
  )
}
