import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async () => {
  const categories = await db.category.findMany()

  return {
    categories,
  }
})
