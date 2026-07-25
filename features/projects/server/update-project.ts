'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { member, project } from '@/db/schema'
import { auth } from '@/lib/auth'
import { projectSchema, type ProjectData } from '../validation/project-schema'

export async function updateProject({
  projectId,
  orgId,
  data,
}: {
  projectId: string
  orgId: string
  data: ProjectData
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const userId = session.user.id

  const isMember = await db.query.member.findFirst({
    where: and(eq(member.userId, userId), eq(member.organizationId, orgId)),
  })

  if (!isMember) {
    return {
      error:
        'Current user not a member of the workspace where this project exists',
    }
  }

  const { success: canUpdateProject } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ['update'],
      },
    },
  })

  if (!canUpdateProject) {
    return {
      error: 'Current user does not have permission to update this project',
    }
  }

  const parsed = projectSchema.safeParse(data)

  if (!parsed.success) {
    return { error: 'Invalid inputs' }
  }

  const { title, description } = parsed.data

  await db
    .update(project)
    .set({
      title,
      description,
    })
    .where(eq(project.id, projectId))

  revalidatePath(`/projects/${projectId}`)
}
