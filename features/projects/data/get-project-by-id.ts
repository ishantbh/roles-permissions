import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { member, project } from '@/db/schema'

export async function getProjectById({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) {
  const projectById = await db.query.project.findFirst({
    where: and(eq(project?.id, projectId)),
  })

  if (!projectById) return null

  const isMember = await db.query.member.findFirst({
    where: and(
      eq(member.userId, userId),
      eq(member.organizationId, projectById.orgId),
    ),
  })

  if (!isMember) return null

  return projectById
}
