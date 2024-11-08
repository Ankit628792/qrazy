import ResetPassword from '@/components/auth/ResetPassword'

async function Page({ params }: { params: { slug: string } }) {
  return (
    <ResetPassword token={params.slug} />
  )
}

export default Page