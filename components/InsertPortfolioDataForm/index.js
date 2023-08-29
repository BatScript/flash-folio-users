import "react-quill/dist/quill.snow.css";
import Button from "../common/Button";
import styles from "./insertPortfolioDataForm.module.scss";
import Input from "../common/Input";
import { useState, useEffect } from "react";
import NavItemInputs from "./NavItemInputs";
import { saveFormData } from "@/utilities/submitForm";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { getPortfolioByEmail } from "@/common/api";

const InsertPortfolioDataForm = ({ prop }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast({ position: "top-right" });
  const session = useSession();

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    listItems: [{ title: "", desc: "" }],
  });

  const [errorData, setErrorData] = useState({
    name: false,
    profession: false,
    listItems: [false],
  });

  useEffect(() => {
    // fetch portfolio data
    if (session?.data?.user?.email) {
      setIsLoading(true);
      getPortfolioByEmail(session?.data?.user?.email).then((res) => {
        setIsLoading(false);
        if (res?.status === 200) {
          const data = res.data;
          let newListItems = [];

          if (data?.profileContent?.length > 0) {
            data?.profileContent?.map((item, index) => {
              let obj = {
                title: item?.linkLabel,
                desc: item?.content,
              };
              newListItems.push(obj);
            });
          } else {
            newListItems.push({ title: "", desc: "" });
          }

          setFormData({
            name: data?.name,
            profession: data?.jobProfile,
            listItems: newListItems,
          });
        }
      });
    }

    return () => {
      setFormData({
        name: "",
        profession: "",
        listItems: [{ title: "", desc: "" }],
      });
    };
  }, [session]);

  const handleResetError = (name, index) => {
    if (index !== undefined) {
      let newListItems = [...errorData.listItems];
      newListItems[index] = false;
      setErrorData((prev) => ({
        ...prev,
        [name]: newListItems,
      }));
    } else {
      setErrorData((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleNameChange = (e) => {
    console.log("name called");
    setFormData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
    handleResetError("name");
  };

  const handleAgeChange = (e) => {
    console.log("age called");
    setFormData((prevData) => ({
      ...prevData,
      profession: e.target.value,
    }));
    handleResetError("profession");
  };

  const handleTitleChange = (index, e) => {
    console.log("title called");
    const newListItems = [...formData.listItems];
    newListItems[index].title = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      listItems: newListItems,
    }));
    handleResetError("listItems", index);
  };

  const handleDescChange = (index, val) => {
    console.log("desc called");
    const newListItems = [...formData.listItems];
    newListItems[index].desc = val;
    setFormData((prevData) => ({
      ...prevData,
      listItems: newListItems,
    }));
  };

  const handleAddComponent = () => {
    console.log("add component called");
    setFormData((prevData) => ({
      ...prevData,
      listItems: [...prevData.listItems, { title: "", desc: "" }],
    }));
    setErrorData((prev) => ({
      ...prev,
      listItems: [...prev.listItems, false],
    }));
  };

  const handleRemoveComponent = (index) => {
    console.log("remove component called");
    const newListItems = [...formData.listItems];
    newListItems.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      listItems: newListItems,
    }));

    const newErrorListItems = [...errorData.listItems];
    newErrorListItems.splice(index, 1);
    setErrorData((prevData) => ({
      ...prevData,
      listItems: newErrorListItems,
    }));
  };

  const handleSubmit = (e) => {
    if (session?.data?.user) {
      // statrt loading for submit button

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
        setIsLoading(true);
        saveFormData({ ...formData, email: session.data.user?.email }).then(
          (res) => {
            let status = "";
            if (res.status === 200) {
              toast({
                status: "success",
                title: res.data?.message,
              });
              // reseting the data if form get submitted successfully
              // const emptyList = [{ title: "", desc: "" }];
              // setFormData({
              //   name: "",
              //   profession: "",
              //   listItems: emptyList,
              // });
              setErrorData({
                name: false,
                profession: false,
                listItems: [false],
              });
            } else {
              toast({
                status: "error",
                title: res?.response?.data?.error,
              });
            }

            setIsLoading(false);
          }
        );
      }
    }
  };

  useEffect(() => {
    console.log("formdata", formData);
  }, [formData]);

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
          loading={isLoading}
          btnType="submit"
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
};
export default InsertPortfolioDataForm;
