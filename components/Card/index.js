import styles from './card.module.scss'

const Card = ({ isRounded, children, hasPadding, hasBorder }) => {
  return (
    <div
      className={`${hasBorder ? styles.border : ''} ${
        isRounded ? 'br-sm' : ''
      } ${hasPadding ? 'p-2' : ''} shadow w-fit`}
    >
      {children}
    </div>
  )
}

export default Card
