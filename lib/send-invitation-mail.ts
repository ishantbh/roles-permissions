import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInvitationEmail({
  email,
  invitedByUsername,
  workspaceName,
  inviteLink,
}: {
  email: string
  invitedByUsername: string
  workspaceName: string
  inviteLink: string
}) {
  return await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    template: {
      id: 'invite-member',
      variables: {
        INVITED_BY_USERNAME: invitedByUsername,
        WORKSPACE_NAME: workspaceName,
        INVITE_LINK: inviteLink,
      },
    },
  })
}
