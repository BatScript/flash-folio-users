// * More variants could be added based on type, just add your case.
// * Could be custom styled by using sass nesting and targeting 'button' element.

import styles from './button.module.scss'

const Button = ({ text, type, children, onClick, isDisabled, className }) => {
  switch (type) {
    case 'bordered':
      return (
        <button
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
