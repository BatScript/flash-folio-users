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
    <div className="flex justify-between p-2">
      <p className={`${poppins.className} text-md tracking-wide`}>
        <a href="/">
          <strong>FlashWeb</strong>
        </a>
      </p>
      <div className={styles.navbarDesktop}>
        <ul className="flex gap-x-5">
          <li className="cursor-pointer hover-link">
            <a href="/templates">Templates</a>
          </li>
          <li className="cursor-pointer hover-link">
            <a href="https://www.flashweb.in">Blogs</a>
          </li>
          <li className="cursor-pointer">Login/SignUp</li>
        </ul>
      </div>
      <div className={`${styles.navbarMobile}`}>
        <div className="cursor-pointer">
          <List size={25} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
