import { z } from 'zod'

export const projectSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(255, 'Title must be at most 255 characters'),
  description: z.string().optional(),
})

export type ProjectData = z.infer<typeof projectSchema>
