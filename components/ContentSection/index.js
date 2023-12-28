import { useRouter } from 'next/router'
import styles from './contentSection.module.scss'
import { homePageContent } from '@/constants'
import Button from '../common/Button'
import { signIn, useSession } from 'next-auth/react'

const ContentSection = ({ className }) => {
  const router = useRouter()
  const { status } = useSession()

  const handleCreateClick = () => {
    if (status === 'unauthenticated' || status === 'pending') {
      signIn('google', {
        callbackUrl: '/create'
      })
    } else {
      router.push('/create')
    }
  }
  return (
    <div className={`${styles.container} ${className}`}>
      <h1 dangerouslySetInnerHTML={{ __html: homePageContent?.heroText }} />
      <Button
        type="hoverAnimation"
        className="tw-mt-2 tw-mx-auto"
        onClick={handleCreateClick}
      >
        {homePageContent?.ctaText}
      </Button>
    </div>
  )
}

export default ContentSection
