import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

type ProjectDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const { id } = await params

  return <div>Project Details Page: {id}</div>
}
