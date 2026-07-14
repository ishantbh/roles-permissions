import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export async function MembersTable() {
  const { members } = await auth.api.listMembers({
    headers: await headers(),
  })

  return (
    <Table>
      <TableCaption>A list of members in the current workspace.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-25'>User Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className='text-right'>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className='font-medium'>{member.userId}</TableCell>
            <TableCell>{member.user.name}</TableCell>
            <TableCell>{member.user.email}</TableCell>
            <TableCell className='text-right'>{member.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
