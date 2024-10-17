/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Button } from '@/shadcn-ui/button'

async function verifyToken() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return Math.random() > 0.5
}

export const VerifyEmail = async () => {
  const verified = await verifyToken()
  return (
    <section className="w-full h-dvh grid place-items-center p-3">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.dribbble.com/users/720738/screenshots/3008140/media/262ca14adca124e2c316b027e479c638.gif"
        alt=""
      />
      <div className="w-full max-w-2xl aspect-square p-10 sm:p-16 lg:px-20 relative bg-white dark:bg-zinc-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-center leading-normal">
          {verified ? 'Email Verified' : 'Invalid or Expired Link'}
        </h1>
        <p className="text-center text-sm sm:text-base">
          {verified
            ? 'Your email has been successfully verified. You can now log in to your account and access all features.'
            : "The verification link you've clicked appears to be invalid or has expired. Please request a new verification email or contact support if you continue to experience issues."}
        </p>
        <Link href={'/login'} className="mx-auto block -mb-10 mt-4">
          <Button size={'lg'}>
            <span className="text-lg select-none">Close</span>
          </Button>
        </Link>
      </div>
    </section>
  )
}
