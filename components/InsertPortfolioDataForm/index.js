import 'react-quill/dist/quill.snow.css'
import Button from '../common/Button'
import styles from './insertPortfolioDataForm.module.scss'
import Input from '../common/Input'
import { useState } from 'react'
import NavItemInputs from './NavItemInputs'
import { useSelector, useDispatch } from 'react-redux'
import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'
import { updatePortFolio } from '@/thunk/portfolioThunk'

const InsertPortfolioDataForm = () => {
  const { goToStep } = useStepperWithRedux()
  const { templates, user } = useSelector((state) => state)
  const { data } = user
  const { _id: user_id } = data

  const { portfolio } = templates
  const { selectedTemplate, formData } = portfolio
  const [localFormData, setLocalFormData] = useState(formData)
  const dispatch = useDispatch()

  // ! This component looks retarded, please fix it once functional shit of this project is over!
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
    setLocalFormData((prevData) => ({
      ...prevData,
      name: e.target.value
    }))
    handleResetError('name')
  }

  const handleAgeChange = (e) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      profession: e.target.value
    }))
    handleResetError('profession')
  }

  const handleTitleChange = (index, e) => {
    const newListItems = JSON.parse(JSON.stringify(localFormData.listItems))
    newListItems[index].title = e.target.value
    setLocalFormData((prevData) => ({
      ...prevData,
      listItems: newListItems
    }))
    handleResetError('listItems', index)
  }

  const handleDescChange = (index, val) => {
    const newListItems = JSON.parse(JSON.stringify(localFormData.listItems))
    newListItems[index].desc = val
    setLocalFormData((prevData) => ({
      ...prevData,
      listItems: newListItems
    }))
  }

  const handleAddComponent = () => {
    setLocalFormData((prevData) => ({
      ...prevData,
      listItems: [...prevData.listItems, { title: '', desc: '' }]
    }))
    setErrorData((prev) => ({
      ...prev,
      listItems: [...prev.listItems, false]
    }))
  }

  const handleRemoveComponent = (index) => {
    const newListItems = [...localFormData.listItems]
    newListItems.splice(index, 1)
    setLocalFormData((prevData) => ({
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
    Object.keys(localFormData).forEach(function (key, index) {
      if (!localFormData[key] && key !== 'listItems') {
        setErrorData((prev) => ({
          ...prev,
          [key]: `${key} is required!`
        }))
        hasError = true
      } else if (key === 'listItems') {
        localFormData?.listItems?.map((item, index) => {
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
      dispatch(
        updatePortFolio({
          user_id,
          payload: {
            template_data: { ...localFormData },
            template_id: selectedTemplate
          },
          method: 'PATCH'
        })
      ).then((res) => {
        console.log('kjashdkashd', res)
        if (
          res?.payload?.status === 'created' ||
          res?.payload?.status === 'updated'
        ) {
          console.log(res)
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
          value={localFormData?.name}
          onChange={handleNameChange}
          placeHolder="Enter Your Display Name"
          errorMessage={errorData?.name}
        />
        <Input
          className="tw-mt-2"
          variant={Boolean(errorData?.profession) ? 'error' : 'bordered'}
          type="text"
          value={localFormData?.profession}
          onChange={handleAgeChange}
          placeHolder="Enter Your Profession"
          errorMessage={errorData?.profession}
        />
        <p className="tw-mt-1 tw-text-center">
          This (these) section(s) will have a list of what contents you are
          going to display as list titles and descriptions
        </p>
        {localFormData?.listItems?.map((item, index) => {
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
