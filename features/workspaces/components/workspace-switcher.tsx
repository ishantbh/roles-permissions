'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth/auth-client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function WorkspaceSwitcher() {
  const router = useRouter()

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
        {workspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => setActiveWorkspace(workspace.id)}
            className={cn('gap-2 p-2 justify-between text-muted-foreground', {
              'text-foreground': workspace.id === activeWorkspace?.id,
            })}
          >
            <span>{workspace.name}</span>
            <CheckIcon className='size-4' />
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='gap-2 p-2'>
          <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
            <PlusIcon className='size-4' />
          </div>
          <div className='font-medium text-muted-foreground'>Add Workspace</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
