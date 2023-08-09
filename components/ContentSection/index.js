import { useRouter } from 'next/router'
import styles from './contentSection.module.scss'
import { homePageContent } from '@/constants'
import Button from '../common/Button'

const ContentSection = ({ className }) => {
  const router = useRouter()
  return (
    <div className={`${styles.container} ${className}`}>
      <h1 dangerouslySetInnerHTML={{ __html: homePageContent?.heroText }} />
      <Button
        type="hoverAnimation"
        className="tw-mt-2 tw-mx-auto"
        onClick={() => router.push('/create')}
      >
        {homePageContent?.ctaText}
      </Button>
    </div>
  )
}

export default ContentSection
