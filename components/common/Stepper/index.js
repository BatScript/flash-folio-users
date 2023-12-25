import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'
import {
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  Stepper,
  Box,
  Progress
} from '@chakra-ui/react'

const CommonStepper = ({ config }) => {
  const { activeStep } = useStepperWithRedux()

  const max = config.length - 1
  const progressPercent = (activeStep / max) * 100

  return (
    <Box position="relative">
      <Stepper size="sm" index={activeStep} gap="0">
        {config.map((step, index) => (
          <Step key={index} gap="0">
            <StepIndicator bg="white">
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
          </Step>
        ))}
      </Stepper>
      <Progress
        value={progressPercent}
        position="absolute"
        height="3px"
        width="full"
        top="10px"
        zIndex={-1}
      />
    </Box>
  )
}

export default CommonStepper
