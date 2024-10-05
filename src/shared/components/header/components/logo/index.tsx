import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components'
import { ROUTES } from '@/shared/shared.interface'

export const Logo = () => {
  return (
    <Container className="flex lg:flex-1">
      <Link href={ROUTES.HOME}>
        <Image
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="filter dark:drop-shadow-lg dark:shadow-inherit bg-black-400 rounded-full"
          placeholder="empty"
          priority
        />
      </Link>
    </Container>
  )
}
