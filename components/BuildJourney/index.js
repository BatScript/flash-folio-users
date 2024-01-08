import styles from './buildJourney.module.scss'
import dynamic from 'next/dynamic'
import { STEPS } from '@/constants/stepperConfig'
import CommonStepper from '../common/Stepper'
import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'
import { useSelector } from 'react-redux'
import ChooseSubdomain from '../ChooseSubdomain'
import CardGrid from './CardGrid'

// dynamic imports
const InsertPortfolioDataForm = dynamic(
  () => import('../InsertPortfolioDataForm'),
  {
    ssr: false
  }
)

const BuildJourney = () => {
  const { activeStep, goToStep } = useStepperWithRedux()
  const { templates } = useSelector((state) => state)
  const { allTemplates } = templates
  const templateList = allTemplates?.data

  const CurrentStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className={styles.grid}>
            {templateList?.map((val, index) => {
              return (
                <CardGrid key={index} cardContent={val} cardIndex={index} />
              )
            })}
          </div>
        )
      case 1:
        return (
          <div>
            <InsertPortfolioDataForm />
          </div>
        )
      case 2:
        return <ChooseSubdomain />
    }
  }

  return (
    <div className="tw-container tw-mx-auto tw-max-w-full">
      <div className="tw-mx-auto tw-flex tw-justify-center">
        <CommonStepper config={STEPS} />
      </div>
      <div className="tw-mt-10">
        <CurrentStep />
      </div>
    </div>
  )
}

export default BuildJourney
