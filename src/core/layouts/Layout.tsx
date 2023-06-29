import Head from "next/head"
import React, { useContext, useState } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Header from "../components/Header"
import { APP_NAME } from "../constants"
import { EventContext } from "src/pages/_app"
import NewPostPopover from "../components/NewPostPopover"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [newPostPopoverVisible, setNewPostPopoverVisible] = useState(false)
  const event = useContext(EventContext)

  event?.useSubscription((e) => {
    if (e.type === "SHOW_NEW_POST_POPOVER") setNewPostPopoverVisible(true)
  })

  return (
    <>
      <Head>
        <title>{title || APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <NewPostPopover visible={newPostPopoverVisible} />
    </>
  )
}

export default Layout
