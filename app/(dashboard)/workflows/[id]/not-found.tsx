import Link from "next/link"

import { Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Empty className="border-none">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Workflow />
          </EmptyMedia>
          <EmptyTitle>Workflow not found</EmptyTitle>
          <EmptyDescription>
            This workflow doesn&apos;t exist or you don&apos;t have access to it.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/">Back to dashboard</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
