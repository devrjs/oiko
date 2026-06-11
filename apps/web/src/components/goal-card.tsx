import { Pencil } from 'lucide-react'
import type { ReactElement, SetStateAction } from 'react'

interface GoalCardProps {
  icon?: ReactElement
  title: string
  value: string | undefined
  set_starting_amount?: React.Dispatch<SetStateAction<string>>
  set_target_amount?: React.Dispatch<SetStateAction<string>>
  set_target_date?: React.Dispatch<SetStateAction<string>>
  disabled?: boolean
  textColor: string
}

export function GoalCard({
  title,
  value,
  icon,
  set_starting_amount,
  set_target_amount,
  set_target_date,
  textColor,
  disabled,
}: GoalCardProps) {
  return (
    <div className='flex flex-col justify-between rounded-lg bg-gray-800 p-4 md:rounded-xl'>
      <header className='flex items-center gap-3 text-xl md:text-2xl'>
        {icon}
        <h3>{title}</h3>
      </header>

      <div className='mt-4 flex items-center rounded-lg pr-2 ring-cyan-400 focus-within:ring-2'>
        <input
          aria-label={title}
          className={`h-full w-full bg-gray-800 px-2 py-2 text-3xl md:text-4xl ${textColor} rounded-lg outline-none`}
          defaultValue={value}
          onChange={e => {
            set_starting_amount?.(e.target.value)
            set_target_amount?.(e.target.value)
            set_target_date?.(e.target.value)
          }}
          disabled={disabled}
        />

        <button
          type='button'
          className={`${
            disabled && 'hidden'
          } max-h-12 max-w-[48px] rounded-lg bg-cyan-500 px-2 py-2 hover:bg-cyan-400`}
        >
          <Pencil className='h-6 w-6 text-white' />
        </button>
      </div>
    </div>
  )
}
