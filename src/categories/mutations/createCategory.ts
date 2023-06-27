import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCategorySchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateCategorySchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const category = await db.category.create({ data: input })

    return category
  }
)
