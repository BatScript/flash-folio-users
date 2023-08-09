import styles from './card.module.scss'

const Card = ({ isRounded, children, hasPadding, hasBorder, maxWidth }) => {
  return (
    <div
      style={{ maxWidth: `${maxWidth}px` }}
      className={`${hasBorder ? styles.border : ''} ${
        isRounded ? 'tw-br-sm' : ''
      } ${hasPadding ? 'tw-p-2' : ''} tw-shadow tw-w-fit`}
    >
      {children}
    </div>
  )
}

export default Card
