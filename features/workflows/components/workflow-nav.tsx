"use client"

import * as React from "react"

import { Plus, Workflow } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { Workflow as WorkflowType } from "@/lib/db/schema"
import { generateSlug } from "@/features/workflows/lib/generate-slug"

interface WorkflowNavProps {
  workflows: WorkflowType[]
  createWorkflowAction: (name: string) => Promise<void>
}

export function WorkflowNav({
  workflows,
  createWorkflowAction,
}: WorkflowNavProps) {
  const { state } = useSidebar()
  const [isPending, startTransition] = React.useTransition()

  const handleCreateWorkflow = () => {
    startTransition(async () => await createWorkflowAction(generateSlug()))
  }

  const workflowItems = workflows.map((workflow) => (
    <SidebarMenuItem key={workflow.id}>
      <SidebarMenuButton>
        <span>{workflow.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Workflows">
                  <Workflow />
                  <span>Workflows</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-56">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={handleCreateWorkflow}
                      disabled={isPending}
                    >
                      <Plus />
                      <span>New workflow</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <Separator />
                <SidebarMenu>{workflowItems}</SidebarMenu>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction
        title="New workflow"
        onClick={handleCreateWorkflow}
        disabled={isPending}
      >
        <Plus />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu className="gap-y-0.5">{workflowItems}</SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
