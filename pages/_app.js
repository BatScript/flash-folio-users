import '@/styles/globals.scss'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import PageTransition from '../components/PageTransition'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: '',
          color: ''
        }
      })
    }
  })

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <motion.div
          key={router.route} // Ensure the route change triggers the animation
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1
            }
          }}
        >
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
        </motion.div>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
