import ContentSection from '@/components/ContentSection'
import Navbar from '@/components/Navbar'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  subsets: ['latin']
})

export default function Home() {
  return (
    <div className={`min-h-screen ${outfit.className}`}>
      <Navbar />
      <ContentSection />
    </div>
  )
}
