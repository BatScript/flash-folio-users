import styles from './templateGrid.module.scss'
import Card from '../Card'
import Image from 'next/image'

const TemplateGrid = () => {
  return (
    <div className={styles.grid}>
      <Card hasPadding={true} isRounded={true} hasBorder={true}>
        <div>
          <Image src="/images/website.png" width={200} height={80} />
        </div>
        Tsaa
      </Card>
    </div>
  )
}

export default TemplateGrid
