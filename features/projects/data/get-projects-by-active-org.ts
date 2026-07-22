import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { member, project } from '@/db/schema'

export async function getProjectsByActiveOrg({
  userId,
  activeOrgId,
}: {
  userId: string
  activeOrgId: string
}) {
  const isMember = await db.query.member.findFirst({
    where: and(
      eq(member.userId, userId),
      eq(member.organizationId, activeOrgId),
    ),
  })

  if (!isMember) return null

  return db.query.project.findMany({
    where: eq(project.orgId, activeOrgId),
  })
}
