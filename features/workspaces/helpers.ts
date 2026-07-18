import { asc, eq } from 'drizzle-orm'

import { db } from '@/db'
import { member } from '@/db/schema'

export async function getInitialWorkspace(userId: string) {
  const membership = await db.query.member.findFirst({
    where: eq(member.userId, userId),
    orderBy: asc(member.createdAt),
    with: {
      organization: true,
    },
  })

  return membership?.organization ?? null
}
