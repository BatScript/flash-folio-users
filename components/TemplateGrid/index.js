import styles from './templateGrid.module.scss'
import Card from '../common/Card'
import Image from 'next/image'
import { templateList } from '@/constants'
import { CaretRightFill, PlusCircleFill } from 'react-bootstrap-icons'
import Button from '../common/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NavigationButtons from '../common/NavigationButtons'
import dynamic from 'next/dynamic'

// dynamic imports
const InsertPortfolioDataForm = dynamic(
  () => import('../InsertPortfolioDataForm'),
  {
    ssr: false
  }
)

const TemplateGrid = () => {
  // Initialisations 👇
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedComponent] = useState(null)
  // ----------------
  // Functions 👇
  const templateSelectTrigger = (cardIndex) => {
    setSelectedComponent(cardIndex)
    setStep(2)
  }

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleNextStep = () => {
    if (step < 3 && selectedTemplate) {
      setStep(step + 1)
    }
  }
  // ----------------
  // Sub Components 👇
  const CardGrid = ({ cardContent, cardIndex }) => {
    return (
      <Card hasPadding={true} hasBorder={true} maxWidth={300}>
        <div>
          <Image src={cardContent?.image} width={300} height={120} />
        </div>
        <p className="tw-mt-1">
          <strong>{cardContent?.name}</strong>
        </p>
        <p dangerouslySetInnerHTML={{ __html: cardContent?.description }} />
        <div className="tw-mt-1 tw-flex tw-justify-between tw-gap-2">
          <Button
            className="tw-w-full"
            type="hoverAnimation"
            onClick={() => router.push(cardContent?.previewUrl)}
          >
            <span>Preview</span>&nbsp;
            <CaretRightFill />
          </Button>
          <Button
            theme='light'
            className="tw-w-full"
            type="hoverAnimation"
            onClick={() => templateSelectTrigger(cardIndex)}
          >
            <span>Use</span>&nbsp;
            <PlusCircleFill />
          </Button>
        </div>
      </Card>
    )
  }
  const CurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.grid}>
            {templateList.map((val, index) => {
              return <CardGrid cardContent={val} cardIndex={index} />
            })}
          </div>
        )
      case 2:
        return (
          <div>
            <InsertPortfolioDataForm />
          </div>
        )
    }
  }
  // ----------------
  // Final Return Statement 👇
  return (
    <div className="tw-container tw-mx-auto">
      <NavigationButtons
        showPrevious={true}
        showNext={true}
        currentContentIndex={step}
        finalIndex={2}
        handleNext={() => handleNextStep()}
        handlePrevious={() => handlePreviousStep()}
      />
      {/* <progress className={styles.progressBar} value="32" max="100">
        32%
      </progress> */}

      <CurrentStep />
    </div>
  )
  // ----------------
}

export default TemplateGrid
