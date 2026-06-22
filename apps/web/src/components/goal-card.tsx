import { Pencil } from 'lucide-react'
import type { ReactElement, SetStateAction } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-3 text-xl md:text-2xl'>
          {icon}
          <h3>{title}</h3>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex items-center rounded-lg ring-ring focus-within:ring-2'>
          <input
            aria-label={title}
            className={`h-full w-full bg-transparent px-2 py-2 text-3xl outline-none md:text-4xl ${textColor}`}
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
            } max-h-12 max-w-[48px] rounded-lg bg-primary px-2 py-2 hover:bg-primary/80`}
          >
            <Pencil className='h-6 w-6 text-primary-foreground' />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
