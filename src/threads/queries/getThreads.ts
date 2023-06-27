import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetThreadsInput
  extends Pick<Prisma.ThreadFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetThreadsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: threads,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.thread.count({ where }),
    query: (paginateArgs) =>
      db.thread.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: {
          categories: true,
          creator: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      }),
  })

  return {
    threads,
    nextPage,
    hasMore,
    count,
  }
})
