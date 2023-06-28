import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetThread = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetThread), async ({ id }) => {
  const thread = await db.thread.findFirst({ where: { id }, include: { categories: true } })

  if (!thread) throw new NotFoundError()

  return thread
})
