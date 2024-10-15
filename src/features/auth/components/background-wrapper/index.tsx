/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import useAuthStore from '../../store/auth.store'
import { cn } from '@/libs/utils'
import { CURRENT_AUTH_STEP } from '../../auth.interface'
import { Logo } from '@/shared/components/header/components/logo'

type AuthBackgroundWrapperProps = {
  type: CURRENT_AUTH_STEP
  children: React.ReactNode
}

export const AuthBackgroundWrapper = ({
  type,
  children
}: AuthBackgroundWrapperProps) => {
  const { authStepsImages } = useAuthStore()
  function getRandomImage() {
    return authStepsImages[Math.floor(Math.random() * authStepsImages.length)]
  }
  return (
    <section
      className={cn(
        'w-full flex h-dvh bg-zinc-900 dark:bg-white',
        type == 'register' ? 'flex-row-reverse' : ''
      )}
    >
      <div
        className={cn(
          'w-full lg:w-1/2 p-10 bg-white dark:bg-zinc-900 grid place-items-center relative'
        )}
      >
        <div className="flex flex-col gap-2 w-full max-w-sm xl:max-w-md">
          <Logo />
          {children}
        </div>

        <div className="text-base flex flex-wrap gap-2 justify-between w-full absolute bottom-0 left-0 right-0 p-5">
          <div className="flex-shrink-0">
            Copyright&copy;2023
            <Link href={''} className="text-emerald-500 px-1 font-medium">
              Delanki
            </Link>
          </div>
          <div className="flex-shrink-0 space-x-4">
            <Link href={''} className="text-emerald-500 font-medium">
              Privacy Policy
            </Link>
            <Link href={''} className="text-emerald-500 font-medium">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0 z-10 bg-white dark:bg-zinc-900 bg-opacity-5 dark:bg-opacity-5"></div>
        <img
          src={getRandomImage()}
          className="w-full h-full object-cover object-center"
          alt=""
        />
      </div>
    </section>
  )
}
