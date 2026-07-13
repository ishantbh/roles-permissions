import { z } from 'zod'

export const workspaceSchema = z.object({
  workspaceName: z
    .string()
    .trim()
    .min(2, 'Workspace name must be at least 2 characters long.')
    .max(50, 'Workspace name must be no more than 50 characters long.'),
})

export type WorkspaceFormData = z.infer<typeof workspaceSchema>
