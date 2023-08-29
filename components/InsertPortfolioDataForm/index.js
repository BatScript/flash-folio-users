import 'react-quill/dist/quill.snow.css'
import Button from '../common/Button'
import styles from './insertPortfolioDataForm.module.scss'
import Input from '../common/Input'
import { useState } from 'react'
import NavItemInputs from './NavItemInputs'
import { saveFormData } from '@/utilities/submitForm'
import { useToast } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'


const InsertPortfolioDataForm = ({ prop }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const toast= useToast({position:"top-right"})
  const session = useSession();
  console.log("🚀 ~ file: index.js:17 ~ InsertPortfolioDataForm ~ data:", session)

  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    listItems: [{ title: '', desc: '' }]
  })

  const [errorData, setErrorData] = useState({
    name: false,
    profession: false,
    listItems:[false]
  })
  

  const handleResetError = (name, index) => {
    if(index !== undefined){
      let newListItems = [...errorData.listItems];
      newListItems[index] = false
      setErrorData((prev)=> ({
        ...prev,
        [name]: newListItems
      }))
    }else{
      setErrorData((prev)=> ({
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
    handleResetError("profession")
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
    if (session?.data?.user) {
      // statrt loading for submit button
      setIsLoading(true);
      e.preventDefault();
      let hasError = false;
      Object.keys(formData).forEach(function (key, index) {
        if (!formData[key] && key !== "listItems") {
          setErrorData((prev) => ({
            ...prev,
            [key]: `${key} is required!`,
          }));
          hasError = true;
        } else if (key === "listItems") {
          formData?.listItems?.map((item, index) => {
            if (item?.title === "") {
              let newListItem = [...errorData.listItems];
              newListItem[index] = `Title is required`;
              setErrorData((prev) => ({
                ...prev,
                listItems: newListItem,
              }));
              hasError = true;
            }
          });
        }
      });

      // Handle form submission with formData
      if (!hasError) {
        saveFormData({...formData, email: session.data.user?.email}).then((res) => {
          let status = "";
          if (res.status === 200) {
            status = "success";
            // reseting the data if form get submitted successfully
            setFormData({
              name: "",
              profession: "",
              listItems: [{ title: "", desc: "" }],
            });
            setErrorData({
              name: false,
              profession: false,
              listItems: [false],
            });
          } else {
            status = "error";
          }
          toast({
            status,
            title: res.data?.message,
          });
          setIsLoading(false);
        });
      }
    }
  };
  

  return (
    <div className={`tw-px-2 ${styles.formContainer}`}>
      <h1 className="tw-text-center tw-text-lg tw-font-bold">
        This is where you decide what you want to tell your audience!
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          required
          className="tw-mt-2"
          variant={Boolean(errorData?.name) ? "error" : "bordered"}
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          placeHolder="Enter Your Display Name"
          errorMessage={errorData?.name}

        />
        <Input
          className="tw-mt-2"
          variant={Boolean(errorData?.profession) ? "error" : "bordered"}
          type="text"
          value={formData.profession}
          onChange={handleAgeChange}
          placeHolder="Enter Your Profession"
          errorMessage={errorData?.profession}
        />
        <p className="tw-mt-1 tw-text-center">
          This (these) section(s) will have a list of what contents you are
          going to display as list titles and descriptions
        </p>
        {formData.listItems.map((item, index) => {
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
          );
        })}

        <Button
          className="tw-ml-auto tw-mt-2"
          type="bordered"
          onClick={handleAddComponent}
        >
          Add Component
        </Button>

        <Button
          isDisabled={isLoading}
          loading = {isLoading}
          btnType='submit'
          className={`tw-w-full tw-mt-2 tw-sticky tw-bottom-0 ${styles.submitButton}`}
          type="bordered"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
export default InsertPortfolioDataForm
