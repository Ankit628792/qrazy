import Link from 'next/link'
import { INavigationData } from '../../header.interface'
import { IUserLogin } from '@/features/auth/auth.interface'
import { Container } from '@/components'

type NavOptionsProps = {
  navigationData: INavigationData[]
  user: IUserLogin | null
}

export const NavBarOptions = ({ navigationData, user }: NavOptionsProps) => {
  return (
    <Container className="flex flex-col lg:gap-y-2">
      {user && <Link href="/user">Profile</Link>}
      {navigationData.map((item) => (
        <Link key={item.name} href={item.href}>
          {item.name}
        </Link>
      ))}
    </Container>
  )
}
