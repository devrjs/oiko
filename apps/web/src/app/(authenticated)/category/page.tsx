import { CategoryTable } from '@/components/category-table'
import { PageHeader } from '@/components/page-header'

export default function Category() {
  return (
    <section className='flex min-h-[600px] w-full flex-col rounded-2xl bg-gray-900 px-2 py-4'>
      <PageHeader title='Categorizar Finança' add_button='Adicionar Categoria' />

      <CategoryTable />
    </section>
  )
}
