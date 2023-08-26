// * More variants could be added based on type, just add your case.
// * Could be custom styled by using sass nesting and targeting 'button' element.

import styles from './button.module.scss'

const Button = ({ text, type, children, isDisabled, className, onClick, btnType='button' }) => {
  switch (type) {
    case 'bordered':
      return (
        <button
        type={btnType}
        className={`${className} ${styles.borderedButton}`}
        onClick={onClick}
        disabled={isDisabled}
        >
          {children}
          {text}
        </button>
      )
      case 'hoverAnimation':
        return (
          <button
          type={btnType}
          className={`${className} ${styles.hoverAnimatedButton}`}
          onClick={onClick}
          disabled={isDisabled}
        >
          {children}
          {text}
        </button>
      )
    default:
      return (
        <button
          type={btnType}
          onClick={onClick}
          disabled={isDisabled}
          className={`${className}`}
        >
          {children}
          {text}
        </button>
      )
  }
}

export default Button
