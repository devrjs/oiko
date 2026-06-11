import { FinanceChart } from '@/components/chart'
import { LastRecordInfo } from '@/components/last-record-info'
import { TotalFinanceCard } from '@/components/total-finance-card'

export default function Dashboard() {
  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='flex flex-col justify-between gap-4 md:flex-row'>
        <TotalFinanceCard type='Gastos' />
        <TotalFinanceCard type='Ganhos' />
        <TotalFinanceCard type='Balanço' />
      </div>

      <div className='flex flex-col gap-4 xl:flex-row'>
        <FinanceChart />

        <section className='flex w-full flex-col gap-4 sm:flex-row xl:max-w-[320px] xl:flex-col 2xl:max-w-[400px]'>
          <LastRecordInfo type='Gastos' />
          <LastRecordInfo type='Ganhos' />
        </section>
      </div>
    </section>
  )
}
