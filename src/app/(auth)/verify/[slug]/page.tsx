import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/services/HttpService';
import axios from 'axios';
import Link from 'next/link'

async function verifyToken(token: string) {
  try {
    const res: any = await axios.get(BASE_URL + '/auth/email-verification/' + token);
    return Boolean(res?.data?.success)
  } catch (error) {
    console.log("Error in verifying token")
  }
}

async function Page({ params }: { params: { slug: string } }) {

  const verified = await verifyToken(params.slug)

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

export default Page
