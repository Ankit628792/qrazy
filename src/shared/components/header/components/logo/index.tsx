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
          width={32}
          height={32}
          className="filter bg-black-400 rounded-full"
          placeholder="empty"
          priority
        />
      </Link>
    </Container>
  )
}
