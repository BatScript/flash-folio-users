import 'react-quill/dist/quill.snow.css'
import Button from '../common/Button'
import styles from './insertPortfolioDataForm.module.scss'
import Input from '../common/Input'
import { useState } from 'react'
import NavItemInputs from './NavItemInputs'
import { saveFormData } from '@/utilities/submitForm'

const InsertPortfolioDataForm = ({ prop }) => {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    listItems: [{ title: '', desc: '' }]
  })

  const handleNameChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      name: e.target.value
    }))
  }

  const handleAgeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profession: e.target.value
    }))
  }

  const handleTitleChange = (index, e) => {
    const newListItems = [...formData.listItems]
    newListItems[index].title = e.target.value
    setFormData((prevData) => ({
      ...prevData,
      listItems: newListItems
    }))
  }

  const handleDescChange = (index, val) => {
    const newListItems = [...formData.listItems]
    newListItems[index].desc = val
    setFormData((prevData) => ({
      ...prevData,
      listItems: newListItems
    }))
  }

  const handleAddComponent = () => {
    setFormData((prevData) => ({
      ...prevData,
      listItems: [...prevData.listItems, { title: '', desc: '' }]
    }))
  }

  const handleRemoveComponent = (index) => {
    const newListItems = [...formData.listItems]
    newListItems.splice(index, 1)
    setFormData((prevData) => ({
      ...prevData,
      listItems: newListItems
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveFormData(formData)
    // Handle form submission with formData
  }

  return (
    <div className={`tw-px-2 ${styles.formContainer}`}>
      <h1 className="tw-text-center tw-text-lg tw-font-bold">
        This is where you decide what you want to tell your audience!
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          className="tw-mt-2"
          variant="bordered"
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          placeHolder="Enter Your Display Name"
        />
        <Input
          className="tw-mt-2"
          variant="bordered"
          type="text"
          value={formData.age}
          onChange={handleAgeChange}
          placeHolder="Enter Your Profession"
        />
        <p className="tw-mt-1 tw-text-center">
          This (these) section(s) will have a list of what contents you are
          going to display as list titles and descriptions
        </p>
        {formData.listItems.map((item, index) => {
          return (
            <NavItemInputs
              item={item}
              key={index}
              index={index}
              handleRemoveComponent={handleRemoveComponent}
              handleTitleChange={handleTitleChange}
              handleDescChange={handleDescChange}
            />
          )
        })}

        <Button
          className="tw-ml-auto tw-mt-2"
          type="bordered"
          onClick={handleAddComponent}
        >
          Add Component
        </Button>

        <Button
          className={`tw-w-full tw-mt-2 tw-sticky tw-bottom-0 ${styles.submitButton}`}
          type="bordered"
          onClick={(e) => {
            handleSubmit(e)
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}
export default InsertPortfolioDataForm
