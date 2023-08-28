import styles from './navbar.module.scss'
import { List } from 'react-bootstrap-icons'
import { Poppins } from 'next/font/google'
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import AuthSection from './AuthSection'

const poppins = Poppins({
  weight: ['100', '400', '300', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap'
})

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const btnRef = useRef()
  return (
    <div className="tw-flex tw-justify-between tw-p-4">
      <p className={`${poppins.className} tw-text-2xl tw-tracking-wide tw-flex tw-justify-center tw-items-center`}>
        <a href="/">
          <strong>FlashWeb</strong>
        </a>
      </p>
      <div className={styles.navbarDesktop}>
        <ul className="tw-flex tw-gap-x-5">
          <li className="tw-cursor-pointer tw-hover-link">
            <a href="/templates">Templates</a>
          </li>
          <li className="tw-cursor-pointer tw-hover-link">
            <a href="https://www.flashweb.in">Blogs</a>
          </li>
          <li className="tw-cursor-pointer">
            <AuthSection />
          </li>
        </ul>
      </div>
      <div className={`${styles.navbarMobile}`}>
        <div className="tw-cursor-pointer">
          <List size={25} onClick={() => setDrawerOpen(true)} />
        </div>
        <Drawer
          isOpen={drawerOpen}
          placement="right"
          onClose={() => setDrawerOpen(!drawerOpen)}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg={'#dafffb'} color={'#001c30'}>
            <DrawerCloseButton />
            <ul>
              <li className="tw-cursor-pointer tw-p-2">
                <AuthSection />
              </li>
              <li className="tw-cursor-pointer tw-hover-link tw-p-2">
                <a href="/templates">Templates</a>
              </li>
              <li className="tw-cursor-pointer tw-hover-link tw-p-2">
                <a href="https://www.flashweb.in">Blogs</a>
              </li>
            </ul>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

export default Navbar
