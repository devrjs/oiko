import { SignInForm } from '@/components/sign-in-form'

export default function SignIn() {
  return (
    <div className='flex w-[26rem] flex-col justify-center gap-6 rounded-xl bg-gray-800 px-8 pt-6 pb-8'>
      <SignInForm />
    </div>
  )
}
