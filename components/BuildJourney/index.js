import styles from './buildJourney.module.scss'
import dynamic from 'next/dynamic'
import { STEPS } from '@/constants/stepperConfig'
import CommonStepper from '../common/Stepper'
import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'
import { useSelector, useDispatch } from 'react-redux'
import { selectTemplate } from '@/slice/templateSlice'
import ChooseSubdomain from '../ChooseSubdomain'
import CardGrid from './CardGrid'

// dynamic imports
const InsertPortfolioDataForm = dynamic(
  () => import('../InsertPortfolioDataForm'),
  {
    ssr: false
  }
)

const BuildJourney = ({ templates: templateList, savedTemplateData }) => {
  const formState = savedTemplateData
  const { activeStep, goToStep } = useStepperWithRedux()

  const dispatch = useDispatch()

  const templateSelectTrigger = (_id) => {
    // We set the selected template data in redux now
    dispatch(
      selectTemplate(_id)
    )
    goToStep(1)
  }

  const CurrentStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className={styles.grid}>
            {templateList?.map((val, index) => {
              return (
                <CardGrid
                  key={index}
                  templateSelectTrigger={templateSelectTrigger}
                  cardContent={val}
                  cardIndex={index}
                />
              )
            })}
          </div>
        )
      case 1:
        return (
          <div>
            <InsertPortfolioDataForm formState={formState} />
          </div>
        )
      case 2:
        return <ChooseSubdomain />
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

export default BuildJourney
