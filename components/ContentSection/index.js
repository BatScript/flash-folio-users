import { useRouter } from 'next/router'
import styles from './contentSection.module.scss'
import { homePageContent } from '@/constants'
import Button from '../common/Button'

const ContentSection = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <h1 dangerouslySetInnerHTML={{ __html: homePageContent?.heroText }} />
      <Button onClick={() => router.push('/create')}>
        {homePageContent?.ctaText}
      </Button>
    </div>
  )
}

export default ContentSection
