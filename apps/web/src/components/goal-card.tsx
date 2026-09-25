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
  inputMode?: 'decimal' | 'numeric' | 'text'
  placeholder?: string
  enterKeyHint?:
    | 'next'
    | 'done'
    | 'enter'
    | 'go'
    | 'previous'
    | 'search'
    | 'send'
  autoComplete?: string
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
  inputMode,
  placeholder,
  enterKeyHint,
  autoComplete = 'off',
}: GoalCardProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-3 text-xl md:text-2xl'>
          {icon}
          <h2 className='text-xl md:text-2xl'>{title}</h2>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex items-center gap-2 rounded-none ring-ring focus-within:ring-2'>
          <input
            aria-label={title}
            className={`h-full w-full bg-transparent px-2 py-2 font-mono text-xl tabular-nums outline-none md:text-2xl xl:text-3xl ${textColor}`}
            defaultValue={value}
            inputMode={inputMode}
            placeholder={placeholder}
            enterKeyHint={enterKeyHint}
            autoComplete={autoComplete}
            onChange={e => {
              set_starting_amount?.(e.target.value)
              set_target_amount?.(e.target.value)
              set_target_date?.(e.target.value)
            }}
            disabled={disabled}
          />

          <button
            type='button'
            aria-label={`Editar ${title}`}
            className={`${
              disabled && 'hidden'
            } inline-flex h-11 max-h-12 w-11 max-w-[48px] min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-none bg-primary px-2 py-2 hover:bg-primary/80 pointer-coarse:h-11 pointer-coarse:w-11`}
          >
            <Pencil
              aria-hidden='true'
              className='h-6 w-6 text-primary-foreground'
            />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
