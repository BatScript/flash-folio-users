import styles from './input.module.scss'

const Input = ({ type = 'bordered', className = '', placeHolder = '' }) => {
  // Initialisations 👇
  // ----------------
  // Functions 👇
  // ----------------
  // Sub Components 👇
  // ----------------
  // Final Return Statement 👇
  switch (type) {
    case 'bordered':
      return (
        <input
          className={`${className} w-full ${styles.bordered}`}
          placeholder={placeHolder}
        />
      )
  }
  // ----------------
}
export default Input
