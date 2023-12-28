import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
  const { isLoading } = useSelector((state) => state.loading)
  return (
    <div className="tw-min-h-screen">
      <Navbar />
      {isLoading ? <p> Loading...</p> : children}
      <Footer />
    </div>
  )
}

export default Layout
