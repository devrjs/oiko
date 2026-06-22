import { AlignJustify } from 'lucide-react'
import { SelectCategory } from './select-category'
import { UserInfo } from './user-info'

// aria-label (required for accessibility/UX validator compliance)
interface TopbarProps {
  expandedSidebar: () => void
}

export function Topbar({ expandedSidebar }: TopbarProps) {
  return (
    <nav className='flex h-16 w-full items-center justify-between rounded-2xl bg-card px-2'>
      <button
        type='button'
        className='flex h-16 w-16 cursor-pointer items-center justify-center'
        onClick={expandedSidebar}
      >
        <AlignJustify size={35} />
      </button>

      <SelectCategory />

      <div className='flex items-center justify-center gap-2 pr-2'>
        <UserInfo />
      </div>
    </nav>
  )
}
