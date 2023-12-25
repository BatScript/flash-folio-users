import styles from './templateGrid.module.scss'
import Card from '../common/Card'
import Image from 'next/image'
import { CaretRightFill, PlusCircleFill } from 'react-bootstrap-icons'
import Button from '../common/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { STEPS } from '@/constants/stepperConfig'
import CommonStepper from '../common/Stepper'
import { useSession } from 'next-auth/react'
import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'

// dynamic imports
const InsertPortfolioDataForm = dynamic(
  () => import('../InsertPortfolioDataForm'),
  {
    ssr: false
  }
)

const TemplateGrid = ({ templates: templateList }) => {
  const router = useRouter()
  const { activeStep, nextStep, prevStep, goToStep, reset } =
    useStepperWithRedux()
  const { data: session, status } = useSession()

  const templateSelectTrigger = (cardIndex) => {
    console.log(cardIndex)
    goToStep(1)
  }

  const CardGrid = ({ cardContent, cardIndex }) => {
    return (
      <Card hasPadding={true} hasBorder={true} maxWidth={300}>
        <div>
          <Image src={cardContent?.content?.img} width={300} height={120} />
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
            theme="light"
            className="tw-w-full"
            type="hoverAnimation"
            onClick={() => templateSelectTrigger(cardIndex)}
            isDisabled={status !== 'authenticated'}
          >
            <span>Use</span>&nbsp;
            <PlusCircleFill />
          </Button>
        </div>
      </Card>
    )
  }
  const CurrentStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className={styles.grid}>
            {templateList?.map((val, index) => {
              return <CardGrid cardContent={val} cardIndex={index} />
            })}
          </div>
        )
      case 1:
        return (
          <div>
            <InsertPortfolioDataForm />
          </div>
        )
    }
  }

  return (
    <div className="tw-container tw-mx-auto">
      <CommonStepper config={STEPS} />
      <div className="tw-mt-10">
        <CurrentStep />
      </div>
    </div>
  )
}

export default TemplateGrid
