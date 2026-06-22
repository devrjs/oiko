import { SignInForm } from '@/components/sign-in-form'

export default function SignIn() {
  return (
    <div className='flex w-104 flex-col justify-center gap-6 rounded-xl bg-card px-8 pt-6 pb-8'>
      <SignInForm />
    </div>
  )
}
