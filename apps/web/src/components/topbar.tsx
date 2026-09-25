import { AlignJustify } from 'lucide-react'
import { SelectCategory } from './select-category'
import { UserInfo } from './user-info'

interface TopbarProps {
  onToggleSidebar: () => void
  sidebarOpen: boolean
  sidebarControlsId: string
}

export function Topbar({
  onToggleSidebar,
  sidebarOpen,
  sidebarControlsId,
}: TopbarProps) {
  return (
    <nav
      aria-label='Barra superior'
      className='flex h-16 w-full items-center justify-between rounded-2xl bg-card px-2'
    >
      <button
        type='button'
        aria-label={sidebarOpen ? 'Fechar barra lateral' : 'Abrir barra lateral'}
        aria-expanded={sidebarOpen}
        aria-controls={sidebarControlsId}
        className='grid h-16 max-h-[64px] min-h-[44px] w-16 min-w-[44px] cursor-pointer place-items-center rounded-none outline-none hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring lg:hidden'
        onClick={onToggleSidebar}
      >
        <AlignJustify size={35} aria-hidden='true' />
      </button>

      <SelectCategory />

      <div className='flex items-center justify-center gap-2 pr-2'>
        <UserInfo />
      </div>
    </nav>
  )
}
