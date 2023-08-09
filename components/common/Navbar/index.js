import styles from './navbar.module.scss'
import { List } from 'react-bootstrap-icons'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['100', '400', '300', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap'
})

const Navbar = () => {
  return (
    <div className="tw-flex tw-justify-between tw-p-2">
      <p className={`${poppins.className} tw-text-md tw-tracking-wide`}>
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
          <li className="tw-cursor-pointer">Login/SignUp</li>
        </ul>
      </div>
      <div className={`${styles.navbarMobile}`}>
        <div className="tw-cursor-pointer">
          <List size={25} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
