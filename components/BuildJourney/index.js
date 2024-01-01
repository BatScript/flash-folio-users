import styles from './buildJourney.module.scss'
import dynamic from 'next/dynamic'
import { STEPS } from '@/constants/stepperConfig'
import CommonStepper from '../common/Stepper'
import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'
import { useSelector, useDispatch } from 'react-redux'
import { selectTemplate } from '@/slice/templateSlice'
import ChooseSubdomain from '../ChooseSubdomain'
import CardGrid from './CardGrid'
import { setPortfolio } from '@/utilities/api'

// dynamic imports
const InsertPortfolioDataForm = dynamic(
  () => import('../InsertPortfolioDataForm'),
  {
    ssr: false
  }
)

const BuildJourney = ({ templates: templateList }) => {
  const { activeStep, goToStep } = useStepperWithRedux()
  const { user, templates } = useSelector((state) => state)
  const { data } = user

  const dispatch = useDispatch()

  const templateSelectTrigger = async (_id) => {
    // We set the selected template data in redux now
    //  Todo : Think about thunks
    dispatch(selectTemplate(_id))
    await setPortfolio(data?._id, {
      template_id: _id
    }).then((res) => {
      if (res.status === 'created') {
        goToStep(1)
      } else {
        console.log('error')
      }
    })
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
                  templateSelectTrigger={() => templateSelectTrigger(val._id)}
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
