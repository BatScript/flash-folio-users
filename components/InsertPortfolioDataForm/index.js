import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Button from '../common/Button'
import styles from './insertPortfolioDataForm.module.scss'
import Input from '../common/Input'

const InsertPortfolioDataForm = ({ prop }) => {
  // Initialisations 👇
  // ----------------
  // Functions 👇
  // ----------------
  // Sub Components 👇
  const NavItemInputs = () => {
    return (
      <div className={`${styles.formRow} ${styles.borderTop}`}>
        <Input placeHolder="Nav List Item Label" />
        <ReactQuill
          placeholder="Nav List Item Description"
          className="mt-1"
          theme="snow"
        />
      </div>
    )
  }
  // ----------------
  // Final Return Statement 👇
  return (
    <div className={styles.formContainer}>
      <h1 className="text-center text-lg">
        <strong>
          Before your portfolio goes live, It would love to have some
          Information as Snack 🌯
        </strong>
      </h1>
      <form className={`mt-1 ${styles.form}`}>
        <div className={styles.formRow}>
          <Input placeHolder="Name" className={styles.formInput} />
        </div>
        <div className={styles.formRow}>
          <Input
            placeHolder="What are you? (Your designation)"
            className={styles.formInput}
          />
        </div>
        <div>
          <NavItemInputs />
        </div>
        <div className={styles.formRow}>
          <Button className={styles.submitButton} type="hoverAnimation">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
  // ----------------
}
export default InsertPortfolioDataForm
