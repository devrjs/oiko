import { FinanceTable } from '@/components/finance-table'
import { PageHeader } from '@/components/page-header'

export default function Finances() {
  return (
    <section className='flex min-h-[600px] w-full flex-col bg-transparent px-2 py-4'>
      <PageHeader title='Finanças Realizadas' add_button='Adicionar Finança' />

      <FinanceTable type='finances' />
    </section>
  )
}
