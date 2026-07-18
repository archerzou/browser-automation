import { auth } from "@clerk/nextjs/server"

export default async function TestPage() {
  const { userId } = await auth()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-2 p-6 text-sm">
      <h1 className="text-lg font-medium">Protected test page</h1>
      <p className="text-muted-foreground">
        If you can see this, you are signed in.
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        userId: {userId}
      </p>
    </div>
  )
}
