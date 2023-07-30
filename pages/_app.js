import '@/styles/globals.css'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import PageTransition from '../components/PageTransition'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
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
  )
}

export default MyApp
