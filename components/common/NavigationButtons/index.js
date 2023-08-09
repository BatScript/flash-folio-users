import { colorConstants } from '@/constants'
import React from 'react'
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons'
import Button from '../Button'

const NavigationButtons = ({
  currentContentIndex,
  finalIndex,
  handleNext,
  handlePrevious
}) => {
  // Initialisations 👇
  const { disabledWhite, white } = colorConstants
  const isFirstIndex = currentContentIndex === 1
  const isLastIndex = currentContentIndex === finalIndex
  // ----------------
  // Functions 👇
  // ----------------
  // Sub Components 👇
  // ----------------
  // Final Return Statement 👇
  return (
    <div className="tw-flex tw-justify-between">
      <Button isDisabled={isFirstIndex} onClick={handlePrevious}>
        <ArrowLeftCircle
          className={isFirstIndex ? 'tw-cursor-not-allowed' : 'tw-cursor-pointer'}
          size={40}
          color={isFirstIndex ? disabledWhite : white}
        />
      </Button>
      <Button isDisabled={isLastIndex} onClick={handleNext}>
        <ArrowRightCircle
          className={isLastIndex ? 'tw-cursor-not-allowed' : 'tw-cursor-pointer'}
          size={40}
          color={isLastIndex ? disabledWhite : white}
        />
      </Button>
    </div>
  )
  // ----------------
}
export default NavigationButtons
