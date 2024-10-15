import Link from 'next/link'
import Image from 'next/image'
import LogoLight from '@/assets/logo-light.svg'
import LogoDark from '@/assets/logo-dark.svg'
import { ROUTES } from '@/shared/shared.interface'
import { cn } from '@/libs/utils'

type LogoProps = {
  style?: React.CSSProperties
  className?: string
}

export const Logo = ({ style = {}, className = '' }: LogoProps) => {
  return (
    <Link href={ROUTES.HOME}>
      <div
        className={cn(
          'rounded-full overflow-hidden w-16 relative select-none flex',
          className,
          style
        )}
      >
        <Image
          src={LogoDark}
          alt="logo"
          className="w-full h-full object-cover inline-flex dark:hidden"
        />
        <Image
          src={LogoLight}
          alt="logo"
          className="w-full h-full object-cover hidden dark:inline-flex"
        />
      </div>
    </Link>
  )
}
