import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateThreadSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateThreadSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const thread = await db.thread.update({ where: { id }, data })

    return thread
  }
)
