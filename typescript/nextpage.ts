import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// Next Page with a getLayout() method
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

// App Props + Next Page with layout
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type { NextPageWithLayout, AppPropsWithLayout }