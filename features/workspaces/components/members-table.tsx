import { headers } from 'next/headers'
import { PencilIcon, Trash2Icon } from 'lucide-react'

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
import { Button } from '@/components/ui/button'

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
          <TableHead>Role</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className='font-medium'>{member.userId}</TableCell>
            <TableCell>{member.user.name}</TableCell>
            <TableCell>{member.user.email}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell className='text-right'>
              <div className='flex items-center gap-3 justify-end'>
                <Button variant='outline' size='icon' title='Edit'>
                  <PencilIcon className='size-4' />
                  <span className='sr-only'>Edit</span>
                </Button>
                <Button variant='destructive' size='icon' title='Delete'>
                  <Trash2Icon className='size-4' />
                  <span className='sr-only'>Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
