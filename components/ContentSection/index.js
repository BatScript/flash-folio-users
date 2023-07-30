import { useRouter } from 'next/router'
import styles from './contentSection.module.scss'

const ContentSection = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <h1>
        <strong>Instant Portfolio Websites:</strong>
        <br /> Effortless, Personalized, and Stunning! Create Your Dream
        Portfolio with Ease.
        <br />
        No Coding Required.
      </h1>
      <button onClick={() => router.push('/create')}>Get Started Now!</button>
    </div>
  )
}

export default ContentSection
