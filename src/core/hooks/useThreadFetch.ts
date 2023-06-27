import { invoke } from "@blitzjs/rpc"
import { Category, Thread, User } from "@prisma/client"
import { useState, useEffect, useCallback } from "react"
import getThreads from "src/threads/queries/getThreads"
import { useWindowSize } from "usehooks-ts"

function useThreadFetch(page: number, selectedCategories: Category[]) {
  const [loading, setLoading] = useState(false)
  const [threads, setThreads] = useState<
    (Thread & { categories: Category[]; creator: Pick<User, "id" | "name" | "avatar"> })[]
  >([])
  const [selectedCategoriesState, setSelectedCategories] = useState(selectedCategories)
  const { height } = useWindowSize()
  const take = Math.floor(height / 50)

  const fetchThreads = useCallback(async () => {
    try {
      setLoading(true)
      const response = await invoke(getThreads, {
        where: {
          categories: {
            some: {
              id: {
                in: selectedCategoriesState.length
                  ? selectedCategoriesState.map((c) => c.id)
                  : undefined,
              },
            },
          },
        },
        take,
        skip: page * take,
      })
      setThreads((p) => [...p, ...response.threads])
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }, [page, selectedCategoriesState, take])

  useEffect(() => {
    void fetchThreads()
  }, [fetchThreads])

  const reset = useCallback(
    (selectedCategories: Category[]) => {
      setSelectedCategories(selectedCategories)
      setThreads([])
    },
    [setSelectedCategories, setThreads]
  )

  return { loading, threads, reset }
}

export default useThreadFetch
