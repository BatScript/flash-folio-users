import { STEPS } from '@/constants/stepperConfig'
import { useDispatch, useSelector } from 'react-redux'
import {
  incrementStep,
  decrementStep,
  resetStepper,
  setStep
} from '@/slice/stepperSlice'
export const useStepperWithRedux = () => {
  const dispatch = useDispatch()

  const activeStep = useSelector((state) => state.stepper.currentStep)
  const totalSteps = STEPS.length

  const nextStep = () => {
    if (activeStep < totalSteps - 1) {
      dispatch(incrementStep())
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      dispatch(decrementStep())
    }
  }

  const goToStep = (step) => {
    if (step >= 0 && step < totalSteps) {
      dispatch(setStep(step))
    }
  }

  const reset = () => {
    dispatch(resetStepper())
  }

  return {
    activeStep,
    nextStep,
    prevStep,
    goToStep,
    reset
  }
}
