import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import Header from "../components/Header"
import { APP_NAME } from "../constants"
import { useTheme } from "next-themes"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { theme } = useTheme()

  return (
    <>
      <Head>
        <title>{title || APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {children}
    </>
  )
}

export default Layout
