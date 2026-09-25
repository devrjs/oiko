import { SearchIcon } from 'lucide-react'
import { type FormEvent, type SetStateAction, useRef } from 'react'
import { Input } from '@/components/ui/input'

interface SearchProps {
  set_search_value: React.Dispatch<SetStateAction<string>>
}

export function Search({ set_search_value }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchClick = () => {
    set_search_value(String(inputRef.current?.value ?? ''))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    handleSearchClick()
  }

  return (
    <form
      role='search'
      aria-label='Pesquisar registros'
      onSubmit={handleSubmit}
      className='flex h-full max-h-[48px] min-h-[48px] w-full items-center rounded-none border border-input bg-muted pr-1 pl-4 focus-within:ring-1 focus-within:ring-ring sm:max-w-[350px]'
    >
      <Input
        ref={inputRef}
        type='search'
        aria-label='Pesquisar'
        className='h-full border-0 bg-transparent ring-0 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
        placeholder='Pesquisar...'
      />
      <button
        type='submit'
        aria-label='Buscar'
        className='grid min-h-[44px] min-w-[44px] place-items-center rounded-none bg-primary p-2 text-[22px] text-primary-foreground outline-none hover:bg-primary/80 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1'
        onClick={handleSearchClick}
      >
        <SearchIcon size={22} aria-hidden='true' />
      </button>
    </form>
  )
}
