import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import type { AppProps } from 'next/app'

import { Layout } from '../components/Layout'
import '../styles/globals.css'
import { LoginProvider } from '../context/LoginContext'

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient()

    return (
        <LoginProvider>
            <QueryClientProvider client={queryClient}>
                <Head>
                    <link rel="shortcut icon" href="/favicon.png" />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </LoginProvider>
    )
}

export default MyApp
