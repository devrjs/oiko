import { GoalsContent } from '@/components/goals-content'
import { PageHeader } from '@/components/page-header'

export default function Goals() {
  return (
    <section className='flex min-h-[600px] w-full flex-col items-center bg-transparent px-2 py-4'>
      <PageHeader title='Carteira e Metas' />

      <GoalsContent />
    </section>
  )
}
