import styles from './navbar.module.scss'
import { List } from 'react-bootstrap-icons'

const Navbar = () => {
  return (
    <div className="flex justify-between p-2">
      <p>FlashFolio</p>
      <div className={styles.navbarDesktop}>
        <ul className="flex gap-x-5">
          <li className="cursor-pointer">Templates</li>
          <li className="cursor-pointer">Login/SignUp</li>
          <li className="cursor-pointer">Blogs</li>
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
