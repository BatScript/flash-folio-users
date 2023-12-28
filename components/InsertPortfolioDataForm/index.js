import 'react-quill/dist/quill.snow.css'
import Button from '../common/Button'
import styles from './insertPortfolioDataForm.module.scss'
import Input from '../common/Input'
import { useState } from 'react'
import NavItemInputs from './NavItemInputs'
import { saveFormData } from '@/utilities/submitForm'
import { useSelector } from 'react-redux'
import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'

const InsertPortfolioDataForm = ({ formState }) => {
  const userInfo = useSelector((state) => state.user.data)
  const { goToStep } = useStepperWithRedux()
  const templateInfo = useSelector((state) => state.templates.selectedTemplate)
  const { _id: user_id } = userInfo
  const { _id: template_id } = templateInfo
  const [formData, setFormData] = useState(formState)

  console.log(formState)

  // ! This component looks retarded, please fix it once function shit of this project is over!
  const [errorData, setErrorData] = useState({
    name: false,
    profession: false,
    listItems: [false]
  })

  const handleResetError = (name, index) => {
    if (index !== undefined) {
      let newListItems = [...errorData.listItems]
      newListItems[index] = false
      setErrorData((prev) => ({
        ...prev,
        [name]: newListItems
      }))
    } else {
      setErrorData((prev) => ({
        ...prev,
        [name]: false
      }))
    }
  }

  const handleNameChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      name: e.target.value
    }))
    handleResetError('name')
  }

  const handleAgeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profession: e.target.value
    }))
    handleResetError('profession')
  }

  const handleTitleChange = (index, e) => {
    const newListItems = [...formData.listItems]
    newListItems[index].title = e.target.value
    setFormData((prevData) => ({
      ...prevData,
      listItems: newListItems
    }))
    handleResetError('listItems', index)
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
    setErrorData((prev) => ({
      ...prev,
      listItems: [...prev.listItems, false]
    }))
  }

  const handleRemoveComponent = (index) => {
    const newListItems = [...formData.listItems]
    newListItems.splice(index, 1)
    setFormData((prevData) => ({
      ...prevData,
      listItems: newListItems
    }))

    const newErrorListItems = [...errorData.listItems]
    newErrorListItems.splice(index, 1)
    setErrorData((prevData) => ({
      ...prevData,
      listItems: newErrorListItems
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let hasError = false
    Object.keys(formData).forEach(function (key, index) {
      if (!formData[key] && key !== 'listItems') {
        setErrorData((prev) => ({
          ...prev,
          [key]: `${key} is required!`
        }))
        hasError = true
      } else if (key === 'listItems') {
        formData?.listItems?.map((item, index) => {
          if (item?.title === '') {
            let newListItem = [...errorData.listItems]
            newListItem[index] = `Title is required`
            setErrorData((prev) => ({
              ...prev,
              listItems: newListItem
            }))
            hasError = true
          }
        })
      }
    })

    if (!hasError) {
      saveFormData(formData)

      // * GO ahead and save the data

      fetch('/api/portfolio', {
        method: 'POST',
        body: JSON.stringify({
          template_data: { ...formData },
          user_id,
          template_id
        })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'created' || res.status === 'updated') {
            goToStep(2)
          }
        })
    }
  }

  return (
    <div className={`tw-px-2 ${styles.formContainer}`}>
      <h1 className="tw-text-center tw-text-lg tw-font-bold">
        This is where you decide what you want to tell your audience!
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          required
          className="tw-mt-2"
          variant={Boolean(errorData?.name) ? 'error' : 'bordered'}
          type="text"
          value={formData?.name}
          onChange={handleNameChange}
          placeHolder="Enter Your Display Name"
          errorMessage={errorData?.name}
        />
        <Input
          className="tw-mt-2"
          variant={Boolean(errorData?.profession) ? 'error' : 'bordered'}
          type="text"
          value={formData?.profession}
          onChange={handleAgeChange}
          placeHolder="Enter Your Profession"
          errorMessage={errorData?.profession}
        />
        <p className="tw-mt-1 tw-text-center">
          This (these) section(s) will have a list of what contents you are
          going to display as list titles and descriptions
        </p>
        {formData?.listItems.map((item, index) => {
          return (
            <NavItemInputs
              titleError={errorData?.listItems[index]}
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
          btnType="submit"
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
