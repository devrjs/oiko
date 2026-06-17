import { PageHeader } from '@/components/page-header'
import { UserForm } from '@/components/user-form'

export default function Profile() {
  return (
    <section className='flex min-h-[600px] w-full flex-col items-center rounded-2xl bg-gray-900 px-2 py-4'>
      <PageHeader title='Perfil do Usuário' />

      <UserForm />
    </section>
  )
}
