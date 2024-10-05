import Link from 'next/link'
import { Container } from '@/components'
import { IBaseMenuItem } from '../left-sidebar.interface'

export interface SidebarContainerProps<T extends IBaseMenuItem> {
  item: T
  index: number
  selectedMenuItem: string | null
  setSelectedMenuItem: (value: string) => void
}

export const SidebarContainer = <T extends IBaseMenuItem>({
  item,
  index,
  selectedMenuItem,
  setSelectedMenuItem
}: SidebarContainerProps<T>) => {
  return (
    <div key={index} className="w-full">
      <Link href={item.link} onClick={() => setSelectedMenuItem(item.title)}>
        <Container
          className={`flex items-center justify-start gap-4 p-2 cursor-pointer hover:bg-gray-200 ${selectedMenuItem === item.title ? 'bg-gray-200 outline-y outline-gray-500/10' : ''}`}
        >
          <Container className="w-6 h-6">
            <item.icon
              className={`${
                selectedMenuItem === item.title
                  ? 'text-blue-400'
                  : 'text-gray-700'
              } h-full w-full`}
            />
          </Container>
          <Container
            className={`text-sm font-semibold ${
              selectedMenuItem === item.title
                ? 'text-blue-400'
                : 'text-gray-700'
            }`}
          >
            {item.title}
          </Container>
        </Container>
      </Link>
    </div>
  )
}
