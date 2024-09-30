import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components'
import { ROUTES } from '@/shared/shared.interface'

export const Logo = () => {
  return (
    <Container className="flex lg:flex-1 bg-black">
      <Link href={ROUTES.HOME}>
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="filter dark:drop-shadow-lg dark:shadow-inherit"
          placeholder="empty"
          priority
        />
      </Link>
    </Container>
  )
}
