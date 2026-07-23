'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

import { db } from '@/db'
import { project } from '@/db/schema'
import { auth } from '@/lib/auth'

export async function deleteProject({ projectId }: { projectId: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const isMember = await auth.api.getActiveMember({
    headers: await headers(),
  })

  if (!isMember) {
    return {
      error: 'Current user not a member of the active workspace',
    }
  }

  const { success: canDeleteProject } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ['delete'],
      },
    },
  })

  if (!canDeleteProject) {
    return {
      error: 'Current user does not have permission to delete this project',
    }
  }

  await db.delete(project).where(eq(project.id, projectId))

  revalidatePath('/projects')
}
