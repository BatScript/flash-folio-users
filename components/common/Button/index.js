// * More variants could be added based on type, just add your case.
// * Could be custom styled by using sass nesting and targeting 'button' element.

import { CircularProgress } from '@chakra-ui/react'
import styles from './button.module.scss'

const Button = ({
  text,
  type,
  children,
  isDisabled,
  className,
  onClick,
  theme = 'dark',
  btnType='button',
  loading=false
}) => {
  switch (type) {
    case 'bordered':
      return (
        <button
        type={btnType}
        className={`${className} ${styles.borderedButton} ${styles[theme]}`}
        onClick={onClick}
        disabled={isDisabled}
        >
          {
            loading ? <CircularProgress size={'26px'} isIndeterminate />
            :
            <>
              {children}
              {text}
            </>
          }
        </button>
      )
    case 'hoverAnimation':
      return (
        <button
          type={btnType}
          className={`${className} ${styles.hoverAnimatedButton} ${styles[theme]}`}
          onClick={onClick}
          disabled={isDisabled}
        >
          {
            loading ? <CircularProgress size={'26px'} isIndeterminate />
            :
            <>
              {children}
              {text}
            </>
          }
        </button>
      )
    case 'icon':
      return (
        <button
          className={`${className}`}
          onClick={onClick}
          disabled={isDisabled}
        >
          {
            loading ? <CircularProgress size={'26px'} isIndeterminate />
            :
            <>
              {children}
              {text}
            </>
          }
        </button>
      )
    default:
      return (
        <button
          type={btnType}
          onClick={onClick}
          disabled={isDisabled}
          className={`${className} ${styles[theme]}`}
        >
         {
            loading ? <CircularProgress size={'26px'} isIndeterminate />
            :
            <>
              {children}
              {text}
            </>
          }
        </button>
      )
  }
}

export default Button
