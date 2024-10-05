import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IUserLogin } from '@/features/auth/auth.interface'
import { Container } from '@/components'
import { ROUTES } from '@/shared/shared.interface'

type renderButtonTypeProps = {
  user: IUserLogin | null
  className?: string
  showProfile?: boolean
  handleSignOut: () => void
  handleSignIn: () => void
}

export const RenderButtonType = ({
  user,
  className = 'rounded-full mx-0 px-6 text-base font-semibold leading-7 text-gray-900 hover:bg-black-400 hover:bg-opacity-15 ring-2 ring-black-400 cursor-pointer w-fit duration-200',
  showProfile = false,
  handleSignOut
}: renderButtonTypeProps) => {
  const pathname = usePathname()

  const isUserOnProfilePage = () => {
    return pathname === ROUTES.USER
  }

  return (
    <React.Fragment>
      {user === null && (
        <Link href={ROUTES.AUTH}>
          <Container className={`${className}`}>Login</Container>
        </Link>
      )}
      {user !== null && !showProfile && (
        <div className={`${className}`} onClick={() => handleSignOut()}>
          Logout
        </div>
      )}
      {user !== null && showProfile && !isUserOnProfilePage() && (
        <Link href={ROUTES.USER}>
          <Container className={`${className}`}>My Profile</Container>
        </Link>
      )}
      {user !== null && showProfile && isUserOnProfilePage() && (
        <Link href={ROUTES.HOME}>
          <Container className={`${className}`}>Home</Container>
        </Link>
      )}
    </React.Fragment>
  )
}
