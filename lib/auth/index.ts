import { betterAuth } from 'better-auth/minimal'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { organization } from 'better-auth/plugins'

import { db } from '@/db'
import { sendInvitationEmail } from '../send-invitation-mail'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    organization({
      async sendInvitationEmail(data) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL!
        const inviteLink = `${baseUrl}/accept-invitation/${data.id}`
        sendInvitationEmail({
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          workspaceName: data.organization.name,
          inviteLink,
        })
      },
    }),
    nextCookies(),
  ],
})
