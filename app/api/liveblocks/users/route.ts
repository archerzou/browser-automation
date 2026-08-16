import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

type UserInfo = {
  name: string
  avatar: string
}

export async function POST(request: Request) {
  // Require an authenticated user with an active organization.
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  let userIds: unknown
  try {
    ;({ userIds } = await request.json())
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 })
  }

  if (
    !Array.isArray(userIds) ||
    !userIds.every((id): id is string => typeof id === "string")
  ) {
    return new NextResponse("`userIds` must be an array of strings", {
      status: 400,
    })
  }

  if (userIds.length === 0) {
    return NextResponse.json([])
  }

  const client = await clerkClient()
  const { data: users } = await client.users.getUserList({
    userId: userIds,
    limit: userIds.length,
  })

  const usersById = new Map(
    users.map((user) => {
      const name =
        user.fullName ||
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.username ||
        user.primaryEmailAddress?.emailAddress ||
        user.id

      return [user.id, { name, avatar: user.imageUrl } satisfies UserInfo]
    })
  )

  // Return display info in the same order as requested, null for unknown ids.
  const result = userIds.map((id) => usersById.get(id) ?? null)

  return NextResponse.json(result)
}
