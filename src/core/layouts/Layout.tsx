import Head from "next/head"
import React, { SyntheticEvent, useContext, useState } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Header from "../components/Header"
import { APP_NAME } from "../constants"
import { ResizeCallbackData, Resizable } from "react-resizable"
import { useWindowSize } from "usehooks-ts"
import { MdDragHandle } from "react-icons/md"
import { EventContext } from "src/pages/_app"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { width, height } = useWindowSize()
  const [newPostPopoverHeight, setNewPostPopoverHeight] = useState(300)
  const [newPostPopoverVisible, setNewPostPopoverVisible] = useState(false)
  const event = useContext(EventContext)

  event?.useSubscription((e) => {
    if (e.type === "SHOW_NEW_POST_POPOVER") setNewPostPopoverVisible(true)
  })

  const onResize = (_event: SyntheticEvent, data: ResizeCallbackData) => {
    setNewPostPopoverHeight(data.size.height)
  }

  return (
    <>
      <Head>
        <title>{title || APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {children}

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
    </>
  )
}

export default Layout
