import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <div className="tw-min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
