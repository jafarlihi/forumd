import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { APP_NAME } from "src/core/constants"
import { Button, Grid, Loading, Spacer } from "@nextui-org/react"
import { useWindowSize } from "usehooks-ts"
import ThreadCard from "../core/components/ThreadCard/ThreadCard"
import CategoryPill from "../core/components/CategoryPill"
import { SyntheticEvent, useContext, useEffect, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import getCategories from "src/categories/queries/getCategories"
import { Category } from "@prisma/client"
import useInfiniteScroll from "src/core/hooks/useInfiniteScroll"
import useThreadFetch from "src/core/hooks/useThreadFetch"
import { AiOutlinePlus } from "react-icons/ai"
import { MdDragHandle } from "react-icons/md"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { EventContext } from "./_app"
import { Resizable } from "react-resizable"

const Feed: BlitzPage = (props: any) => {
  const { width, height } = useWindowSize()
  const [categories] = useQuery(getCategories, undefined)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const { loadMoreRef, page, reset: resetScroll } = useInfiniteScroll()
  const { loading, threads, reset } = useThreadFetch(page, selectedCategories)
  const [newPostPopoverHeight, setNewPostPopoverHeight] = useState(300)
  const [newPostPopoverVisible, setNewPostPopoverVisible] = useState(false)
  const currentUser = useCurrentUser()
  const event = useContext(EventContext)

  useEffect(() => {
    reset(selectedCategories)
    resetScroll()
  }, [selectedCategories, reset, resetScroll])

  const onCategoryClick = (category: Category) => {
    if (selectedCategories.some((c) => c.id === category.id)) {
      setSelectedCategories((p) => p.filter((c) => c.id !== category.id))
    } else {
      setSelectedCategories((p) => [category, ...p])
    }
  }

  const onNewThreadClick = () => {
    if (!currentUser) {
      event?.emit({ type: "OPEN_LOGIN_REGISTER_MODAL" })
      return
    }
    setNewPostPopoverVisible(true)
  }

  const onResize = (_event: SyntheticEvent, { size }) => {
    setNewPostPopoverHeight(size.height)
  }

  return (
    <Layout title={APP_NAME}>
      <Grid.Container gap={2}>
        <Grid xs={12} sm={1.5}>
          <div
            style={{
              display: "flex",
              flexDirection: width >= 960 ? "column" : "row",
              width: "100%",
              position: "sticky",
              alignSelf: "start",
              top: "65px",
            }}
          >
            <Button
              bordered
              color="primary"
              auto
              icon={<AiOutlinePlus />}
              size={width <= 1150 ? "xs" : "md"}
              onPress={onNewThreadClick}
            >
              New Thread
            </Button>
            <Spacer y={1} />
            {categories.categories.map((c: Category) => (
              <CategoryPill
                key={c.id}
                category={c}
                isSelected={selectedCategories.some((sc) => sc.id === c.id)}
                onClick={() => onCategoryClick(c)}
              />
            ))}
          </div>
        </Grid>
        <Grid xs={12} sm={10.5} style={{ flexDirection: "column" }}>
          {threads.map((t) => (
            <div key={t.id}>
              <ThreadCard thread={t} />
              <Spacer y={0.5} />
            </div>
          ))}
          <div
            ref={loadMoreRef}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {loading && <Loading />}
          </div>
        </Grid>
      </Grid.Container>
      {newPostPopoverVisible && (
        <Resizable
          height={newPostPopoverHeight}
          width={width}
          onResize={onResize}
          handle={
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                cursor: "ns-resize",
              }}
            >
              <MdDragHandle />
            </div>
          }
          axis="y"
          resizeHandles={["n"]}
          lockAspectRatio={true}
          transformScale={1}
          minConstraints={[150, 150]}
          maxConstraints={[height - 54, height - 54]}
        >
          <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              height: newPostPopoverHeight + "px",
              backgroundColor: "rgba(120, 120, 120, 0.5)",
              zIndex: "100",
            }}
          ></div>
        </Resizable>
      )}
    </Layout>
  )
}

export default Feed
