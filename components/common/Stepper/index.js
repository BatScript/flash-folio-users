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

  const { portfolio } = templates
  const { selectedTemplate, formData } = portfolio

  const handleStepClick = (step) => {
    console.log(step)
    // * find a better way
    if (step === 1) {
      if (selectedTemplate) {
        goToStep(step)
      } else {
        toast({
          title: 'ERROR',
          description: 'Select the template first',
          status: 'error'
        })
        return
      }
    } else if (step === 2) {
      if (formData && selectedTemplate) {
        goToStep(step)
      } else {
        toast({
          title: 'ERROR',
          description: 'Fill the form first',
          status: 'error'
        })
        return
      }
    } else {
      goToStep(step)
    }
  }

  return (
    <Stepper
      colorScheme="teal"
      gap={{ base: 0, md: 2, lg: 4 }}
      size={{ base: 'sm', md: 'md', lg: 'lg' }}
      index={activeStep}
      // className="tw-m-auto"
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
