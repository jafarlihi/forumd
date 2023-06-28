import { BlitzPage } from "@blitzjs/next"
import { invoke } from "@blitzjs/rpc"
import { Thread } from "@prisma/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "src/core/layouts/Layout"
import getThread from "src/threads/queries/getThread"

const ThreadPage: BlitzPage = (props: any) => {
  const router = useRouter()
  const [thread, setThread] = useState<Thread | null>(null)

  useEffect(() => {
    const fetchThread = async () => {
      setThread(await invoke(getThread, { id: Number(router.query.id) }))
    }
    void fetchThread()
  }, [router.query.id])

  return <Layout title="Thread">{thread?.title}</Layout>
}

export default ThreadPage
