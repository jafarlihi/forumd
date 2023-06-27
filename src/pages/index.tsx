import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { APP_NAME } from "src/core/constants"
import { Grid, Loading, Spacer } from "@nextui-org/react"
import { useWindowSize } from "usehooks-ts"
import ThreadCard from "../core/components/ThreadCard"
import CategoryPill from "../core/components/CategoryPill"
import { useEffect, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import getCategories from "src/categories/queries/getCategories"
import { Category } from "@prisma/client"
import useInfiniteScroll from "src/core/hooks/useInfiniteScroll"
import useThreadFetch from "src/core/hooks/useThreadFetch"

const Feed: BlitzPage = (props: any) => {
  const { width } = useWindowSize()
  const [categories] = useQuery(getCategories, undefined)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const { loadMoreRef, page, reset: resetScroll } = useInfiniteScroll()
  const { loading, threads, reset } = useThreadFetch(page, selectedCategories)

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
    </Layout>
  )
}

export default Feed
