import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import { NextUIProvider, createTheme } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import "src/styles/globals.css"

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

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
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
          <Suspense>{getLayout(<Component {...pageProps} />)}</Suspense>
        </ErrorBoundary>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default withBlitz(MyApp)
