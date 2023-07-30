import ContentSection from '@/components/ContentSection'
import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import FlashFolioMeta from '@/components/Seo/Meta'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  subsets: ['latin']
})

export default function Home() {
  return (
    <Layout>
        <FlashFolioMeta
          title={`Flashfolio`}
          siteName={'flashfolio'}
          type={'website'}
          canonical={'https"//portfolio.flashweb.in'}
          keywords={`portfolio, website builder, portfolio maker`}
          description={`Build your trendy and personalised portfolio website in few steps, without coding!`}
        />
        <ContentSection />
    </Layout>
  )
}
