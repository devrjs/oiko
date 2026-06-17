import { FinanceTable } from '@/components/finance-table'
import { PageHeader } from '@/components/page-header'

export default function Pendencies() {
  return (
    <section className='flex min-h-[600px] w-full flex-col rounded-2xl bg-gray-900 px-2 py-4'>
      <PageHeader title='Finanças Pendetes' add_button='Adicionar Pendência' />

      <FinanceTable type='pendencies' />
    </section>
  )
}
