import styles from './templateGrid.module.scss'
import Card from '../common/Card'
import Image from 'next/image'
import { templateList } from '@/constants'
import { CaretRightFill, PlusCircleFill } from 'react-bootstrap-icons'
import Button from '../common/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NavigationButtons from '../common/NavigationButtons'

const TemplateGrid = () => {
  // Initialisations 👇
  const router = useRouter()
  const [step, setStep] = useState(1)
  // ----------------
  // Functions 👇
  const templateSelectTrigger = () => {
    setStep(2)
  }

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }
  // ----------------
  // Sub Components 👇
  const CardGrid = ({ cardContent, cardIndex }) => {
    return (
      <Card hasPadding={true} isRounded={true} hasBorder={true} maxWidth={300}>
        <div>
          <Image src={cardContent?.image} width={300} height={120} />
        </div>
        <p className="mt-1">
          <strong>{cardContent?.name}</strong>
        </p>
        <p dangerouslySetInnerHTML={{ __html: cardContent?.description }} />
        <div className="mt-1 flex justify-between">
          <Button
            type="bordered"
            onClick={() => router.push(cardContent?.previewUrl)}
          >
            <span>Preview</span>&nbsp;
            <CaretRightFill />
          </Button>
          <Button type="bordered" onClick={templateSelectTrigger}>
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
        return <p>so ja bhadve</p>
    }
  }
  // ----------------
  // Final Return Statement 👇
  return (
    <div className="container mx-auto">
      <NavigationButtons
        currentContentIndex={step}
        finalIndex={2}
        handleNext={() => handleNextStep()}
        handlePrevious={() => handlePreviousStep()}
      />
      <CurrentStep />
    </div>
  )
  // ----------------
}

export default TemplateGrid
