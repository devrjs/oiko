'use client'

import dayjs from 'dayjs'
import {
  Activity,
  BadgePercent,
  Calendar,
  Goal,
  PiggyBank,
  Wallet2,
} from 'lucide-react'
import { useContext, useState } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { convertCurrencyToNumber } from '@/hooks/use-convert-currency-to-number'
import { convertToBRL } from '@/hooks/use-convert-to-brl'
import { dateFormatToUTC } from '@/hooks/use-date-format-to-utc'
import { useGoals } from '@/hooks/use-goals'
import { api } from '@/lib/api'
import { Button } from './button'
import { GoalCard } from './goal-card'
import { Spinner } from './spinner'

// refactor this component's code later
export function GoalsContent() {
  const { selected_category, to_update, set_to_update } =
    useContext(FinanceContext)
  const { data, isLoading, dataUpdatedAt } = useGoals(
    selected_category,
    to_update
  )
  const [starting_amount, set_starting_amount] = useState('')
  const [is_saving, set_is_saving] = useState(false)
  const [is_excluding, set_is_excluding] = useState(false)
  const [target_amount, set_target_amount] = useState('')
  const [target_date, set_target_date] = useState('')

  async function saveGoal() {
    try {
      set_is_saving(true)

      if (data?.goals.id) {
        await api.post('/edit/goals', {
          goal_id: data.goals.id,
          starting_amount: starting_amount
            ? convertCurrencyToNumber(starting_amount)
            : data.goals.target_amount,
          target_amount: target_amount
            ? convertCurrencyToNumber(target_amount)
            : data.goals.target_amount,
          target_date: target_date
            ? dayjs(dateFormatToUTC(target_date)).format(
                'YYYY-MM-DDT[03]:mm:ss[Z]'
              )
            : data.goals.target_date,
        })
      } else {
        await api.post('/add/goals', {
          category_id: selected_category,
          starting_amount: convertCurrencyToNumber(starting_amount),
          target_amount: convertCurrencyToNumber(target_amount),
          target_date: dayjs(dateFormatToUTC(target_date)).format(
            'YYYY-MM-DDT[03]:mm:ss[Z]'
          ),
        })
      }

      set_to_update(!to_update)
    } catch (_error) {
      // handle error
    } finally {
      set_is_saving(false)
    }
  }

  async function deleteGoal() {
    try {
      set_is_excluding(true)

      if (data?.goals.id) {
        await api.post('/delete/goals', {
          goal_id: data.goals.id,
        })
      }

      set_to_update(!to_update)
    } catch (_error) {
      // handle error
    } finally {
      set_is_excluding(false)
    }
  }

  return (
    <div
      key={dataUpdatedAt}
      className='flex h-full w-full flex-col items-center'
    >
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-4 p-4 xl:flex-row'>
            <GoalCard
              title='Saldo inicial'
              value={data && convertToBRL(data.goals.starting_amount)}
              icon={<PiggyBank size={45} />}
              set_starting_amount={set_starting_amount}
              textColor='text-green-500'
            />
            <GoalCard
              title='Valor da meta'
              value={data && convertToBRL(data.goals.target_amount)}
              icon={<Goal size={37} />}
              set_target_amount={set_target_amount}
              textColor='text-orange-500'
            />
            <GoalCard
              title='Data da meta'
              value={
                data && data.goals.status_message === 'Meta não definida!'
                  ? 'dd/mm/aaaa'
                  : dayjs(data?.goals.target_date).format('DD/MM/YYYY')
              }
              icon={<Calendar size={35} />}
              set_target_date={set_target_date}
              textColor='text-orange-500'
            />
          </div>
          <div className='flex flex-col gap-4 p-4 xl:flex-row'>
            <GoalCard
              title='Saldo atual'
              value={data && convertToBRL(data.goals.current_amount)}
              icon={<Wallet2 size={35} />}
              textColor='text-yellow-500'
              disabled
            />
            <GoalCard
              title='Porcentagem alcançada'
              value={data?.goals.percentage_reached}
              icon={<BadgePercent size={37} />}
              textColor='text-yellow-500'
              disabled
            />
            <GoalCard
              title='Status'
              value={data?.goals.status_message}
              icon={<Activity size={35} />}
              textColor='text-yellow-500'
              disabled
            />
          </div>
        </>
      )}

      <div className='mt-auto mb-6 flex w-full max-w-[500px] gap-4'>
        <Button onClick={() => deleteGoal()}>
          {is_excluding ? <Spinner /> : 'Excluir'}
        </Button>
        <Button onClick={() => saveGoal()}>
          {is_saving ? <Spinner /> : 'Salvar'}
        </Button>
      </div>
    </div>
  )
}
