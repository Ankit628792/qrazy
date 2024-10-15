import { Button } from '@/shadcn-ui/button'
import Link from 'next/link'

type ToastProps = {
  open: boolean
  title: string
  description?: string
  route?: string
  onClose: () => void
}

export const Toast = ({
  open,
  title,
  description = '',
  route = '',
  onClose
}: ToastProps) => {
  if (!open) return <></>
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-5">
      <Link
        href={route}
        className="cursor-pointer fixed inset-0 bg-white bg-opacity-40 dark:bg-zinc-900 dark:bg-opacity-40 backdrop-blur-sm"
      />
      <div className="w-full max-w-2xl p-10 sm:p-16 lg:px-20 relative bg-white dark:bg-zinc-900 rounded-xl y-translate">
        <h1 className="text-4xl sm:text-5xl font-bold text-center leading-normal">
          {title}
        </h1>
        {description ? (
          <p className="text-center text-sm sm:text-base my-4">{description}</p>
        ) : (
          <></>
        )}
        <Button onClick={onClose} size={'lg'} className="mx-auto block mt-10">
          <span className="text-lg select-none">Close</span>
        </Button>
      </div>
    </div>
  )
}
