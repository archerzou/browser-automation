import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RightSidebar() {
  return (
    <div className="flex size-full flex-col p-3">
      <Button>
        <Play />
        Run
      </Button>
    </div>
  )
}
