import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(GetUser), async ({ name }) => {
  const user = await db.user.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      avatar: true,
    },
  })

  if (!user) throw new NotFoundError()

  return user
})
