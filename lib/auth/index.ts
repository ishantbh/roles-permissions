import { betterAuth } from 'better-auth/minimal'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { organization } from 'better-auth/plugins'

import { db } from '@/db'

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
        console.log('sendInvitationEmail', data)
        // const inviteLink = `https://example.com/accept-invitation/${data.id}`
        // sendOrganizationInvitation({
        //   email: data.email,
        //   invitedByUsername: data.inviter.user.name,
        //   invitedByEmail: data.inviter.user.email,
        //   teamName: data.organization.name,
        //   inviteLink,
        // })
      },
    }),
    nextCookies(),
  ],
})
