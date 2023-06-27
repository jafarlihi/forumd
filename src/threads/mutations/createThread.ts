import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateThreadSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateThreadSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const thread = await db.thread.create({ data: input })

    return thread
  }
)
