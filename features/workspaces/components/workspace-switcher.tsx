'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth/auth-client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { WorkspaceForm } from './workspace-form'

export function WorkspaceSwitcher() {
  const router = useRouter()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: workspaces } = authClient.useListOrganizations()
  const { data: activeWorkspace } = authClient.useActiveOrganization()

  if (workspaces?.length === 0) {
    router.push('/onboarding')
    return
  }

  async function setActiveWorkspace(workspaceId: string) {
    if (workspaceId === activeWorkspace?.id) {
      return
    }

    try {
      const { error } = await authClient.organization.setActive({
        organizationId: workspaceId,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Successfully switched workspace')
    } catch (error) {
      toast.error('Error switching workspace')
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='px-4 w-full max-w-3xs'>
            <div className='text-sm leading-tight'>
              <span className='truncate font-medium'>
                {activeWorkspace?.name}
              </span>
            </div>
            <ChevronsUpDownIcon className='ml-auto' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className='text-xs text-muted-foreground'>
            Workspaces
          </DropdownMenuLabel>
          {workspaces?.map((workspace) => {
            const isActiveWorkspace = workspace.id === activeWorkspace?.id

            return (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => setActiveWorkspace(workspace.id)}
                className={cn('gap-2 p-2 justify-between')}
              >
                <span>{workspace.name}</span>
                {isActiveWorkspace && <CheckIcon className='size-4' />}
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem className='gap-2 p-2' asChild>
            <DialogTrigger asChild>
              <Button
                variant='ghost'
                size='lg'
                className='w-full justify-start hover:bg-accent aria-expanded:bg-accent dark:hover:bg-accent'
              >
                <PlusIcon className='size-4' />
                <span>Add Workspace</span>
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects.
          </DialogDescription>
        </DialogHeader>

        <WorkspaceForm onClose={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
