import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteThreadSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteThreadSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const thread = await db.thread.deleteMany({ where: { id } })

    return thread
  }
)
