'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

import { db } from '@/db'
import { project } from '@/db/schema'
import { auth } from '@/lib/auth'
import { projectSchema, type ProjectData } from '../validation/project-schema'

export async function createProject(data: ProjectData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const member = await auth.api.getActiveMember({
    headers: await headers(),
  })

  if (!member) {
    return {
      error: 'Current user not a member of the active workspace',
    }
  }

  // NOTE: No need to check permissions here, all users are allowed to create projects

  const parsed = projectSchema.safeParse(data)

  if (!parsed.success) {
    return { error: 'Invalid inputs' }
  }

  const { title, description } = parsed.data

  await db.insert(project).values({
    title,
    description,
    orgId: member.organizationId,
    userId: member.userId,
  })

  revalidatePath('/projects')
}
