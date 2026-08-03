"use client"

import * as React from "react"

import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { Play } from "lucide-react"

import type { helloWorldTask } from "@/trigger/example"
import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "@/features/workflows/actions"

interface RunHandle {
  runId: string
  publicAccessToken: string
}

export function RightSidebar() {
  const [handle, setHandle] = React.useState<RunHandle | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const handleRun = () => {
    startTransition(async () => {
      setHandle(await runWorkflowAction())
    })
  }

  return (
    <div className="flex size-full flex-col gap-3 p-3">
      <Button onClick={handleRun} disabled={isPending}>
        <Play />
        Run
      </Button>

      {handle && (
        <RunStatus
          runId={handle.runId}
          accessToken={handle.publicAccessToken}
        />
      )}
    </div>
  )
}

function RunStatus({
  runId,
  accessToken,
}: {
  runId: string
  accessToken: string
}) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken,
    skipColumns: ["payload"],
  })

  if (error) {
    return (
      <p className="text-sm text-destructive">Error: {error.message}</p>
    )
  }

  if (!run) {
    return <p className="text-sm text-muted-foreground">Starting run…</p>
  }

  return (
    <div className="flex flex-col gap-1 text-sm">
      <p className="text-muted-foreground">
        Status: <span className="text-foreground">{run.status}</span>
      </p>
      {run.output && (
        <p className="text-muted-foreground">
          Output: <span className="text-foreground">{run.output.message}</span>
        </p>
      )}
    </div>
  )
}
