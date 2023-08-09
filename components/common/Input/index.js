import styles from './input.module.scss'

const Input = ({
  variant = 'bordered',
  className = '',
  placeHolder = '',
  onChange,
  value,
  type
}) => {
  // Initialisations 👇
  // ----------------
  // Functions 👇
  // ----------------
  // Sub Components 👇
  // ----------------
  // Final Return Statement 👇
  switch (variant) {
    case 'bordered':
      return (
        <input
          type={type}
          className={`${className} tw-w-full ${styles.bordered}`}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => onChange(e)}
        />
      )
  }
  // ----------------
}
export default Input
