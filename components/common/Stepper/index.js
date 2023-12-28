import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'
import { useSelector } from 'react-redux'
import {
  Step,
  StepIndicator,
  StepStatus,
  Stepper,
  Box,
  StepSeparator,
  StepDescription,
  StepTitle,
  StepIcon,
  StepNumber,
  useToast
} from '@chakra-ui/react'

const CommonStepper = ({ config }) => {
  const { activeStep, goToStep } = useStepperWithRedux()
  const { templates } = useSelector((state) => state)
  const toast = useToast()

  const { selectedTemplate, formData } = templates

  const handleStepClick = (step) => {
    // * find a better way
    switch (step) {
      case 1:
        if (selectedTemplate) {
          goToStep(step)
        } else {
          toast({
            title: 'ERROR',
            description: 'Select the template first',
            status: 'failure'
          })
        }
      case 2:
        if (formData) {
          goToStep(step)
        } else {
          toast({
            title: 'ERROR',
            description: 'Fill the form first',
            status: 'failure'
          })
        }
      default:
        goToStep(step)
    }
  }

  return (
    <Stepper
      size={'lg'}
      index={activeStep}
      maxWidth={'50vw'}
      className="tw-m-auto"
    >
      {config.map((step, index) => (
        <Step
          key={index}
          onClick={() => handleStepClick(index)}
          className="tw-cursor-pointer"
        >
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

export default CommonStepper
