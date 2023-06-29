import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import { NextUIProvider, createTheme } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import "src/styles/globals.css"
import { useEventEmitter } from "ahooks"
import { EventEmitter } from "ahooks/lib/useEventEmitter"
import { APP_NAME } from "src/core/constants"
import Layout from "src/core/layouts/Layout"

const lightTheme = createTheme({
  type: "light",
})

const darkTheme = createTheme({
  type: "dark",
})

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

export const EventContext = React.createContext<EventEmitter<{ type: string; value?: any }> | null>(
  null
)

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const event = useEventEmitter<{ type: string; value?: any }>()

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <ErrorBoundary FallbackComponent={RootErrorFallback}>
          <EventContext.Provider value={event}>
            <Suspense>
              <Layout title={APP_NAME}>{getLayout(<Component {...pageProps} />)}</Layout>
            </Suspense>
          </EventContext.Provider>
        </ErrorBoundary>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default withBlitz(MyApp)
