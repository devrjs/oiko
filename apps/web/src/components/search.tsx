import { SearchIcon } from 'lucide-react'
import { type SetStateAction, useRef } from 'react'

interface SearchProps {
  set_search_value: React.Dispatch<SetStateAction<string>>
}

export function Search({ set_search_value }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchClick = () => {
    set_search_value(String(inputRef.current?.value))
  }

  return (
    <div className='flex h-full max-h-[48px] min-h-[48px] w-full items-center rounded-2xl bg-gray-800 pr-1 pl-4 ring-cyan-400 focus-within:ring-2 sm:max-w-[350px]'>
      <input
        ref={inputRef}
        className='h-full w-full bg-transparent text-gray-100 outline-none placeholder:text-gray-400'
        placeholder='Pesquisar...'
      />
      <button
        type='button'
        className='rounded-xl bg-cyan-500 p-2 text-[22px] text-black hover:bg-cyan-400'
        onClick={handleSearchClick}
      >
        <SearchIcon size={22} />
      </button>
    </div>
  )
}
