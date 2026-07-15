import { z } from 'zod'

export const inviteMembersSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  role: z.enum(['owner', 'admin', 'member']),
})

export type InviteMembersFormData = z.infer<typeof inviteMembersSchema>
