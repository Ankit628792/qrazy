import Link from 'next/link'
import { Container } from '@/components'
import { ROUTES } from '@/shared/shared.interface'

export const NotFoundComponent = () => {
  return (
    <Container
      className="flex items-center justify-center gap-1 ml-auto flex-col h-[100%]"
      centered={true}
    >
      <Container>
        <h2 className="text-4xl text-neutral-900 dark:text-gray-600">
          404 Not Authorized
        </h2>
        <p className="text-neutral-500">
          Need to login to find requested resource
        </p>
        <Link href={ROUTES.HOME} className="text-neutral-500">
          Go Home <span aria-hidden="true">&rarr;</span>
        </Link>
      </Container>
    </Container>
  )
}
