import { BlitzPage } from "@blitzjs/next"
import { invoke } from "@blitzjs/rpc"
import { Spacer, Text } from "@nextui-org/react"
import { Category, Thread } from "@prisma/client"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import getThread from "src/threads/queries/getThread"
import isDarkColor from "is-dark-color"
import CategoryPill from "src/core/components/CategoryPill"

const ThreadPage: BlitzPage = (props: any) => {
  const router = useRouter()
  const [thread, setThread] = useState<(Thread & { categories: Category[] }) | null>(null)
  const [categoryGradient, setCategoryGradient] = useState("")

  useEffect(() => {
    const fetchThread = async () => {
      setThread(await invoke(getThread, { id: Number(router.query.id) }))
    }
    void fetchThread()
  }, [router.query.id])

  const computeCategoryGradient = useCallback((): string => {
    if (!thread?.categories) return ""
    let colors = ""
    for (const category of thread?.categories) colors += "#" + category.color + ","
    if (colors.length) colors = colors.substring(0, colors.length - 1)
    return `linear-gradient(${colors})`
  }, [thread])

  useEffect(() => {
    setCategoryGradient(computeCategoryGradient())
  }, [thread, setCategoryGradient, computeCategoryGradient])

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: categoryGradient,
        backgroundColor:
          thread?.categories.length === 1 ? `#${thread?.categories[0]?.color}` : "unset",
      }}
    >
      <div style={{ display: "flex" }}>
        {thread?.categories?.map((c) => (
          <>
            <CategoryPill key={c.id} category={c} />
            <Spacer x={0.5} />
          </>
        ))}
      </div>
      <Spacer y={0.5} />
      <Text
        color={
          thread?.categories[0]
            ? isDarkColor(thread?.categories[thread?.categories.length - 1]?.color)
              ? "white"
              : "black"
            : "black"
        }
        b
      >
        {thread?.title}
      </Text>
    </div>
  )
}

export default ThreadPage
