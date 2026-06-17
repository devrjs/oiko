import { SignUpForm } from '@/components/sign-up-form'

export default function SignUp() {
  return (
    <div className='flex w-[26rem] flex-col justify-center gap-6 rounded-xl bg-gray-800 px-8 pt-6 pb-8'>
      <h1 className='font-semibold text-xl'>Crie sua conta</h1>

      <SignUpForm />
    </div>
  )
}
