import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import RichTextEditor from '@/components/common/RichTextEditor'

const NavItemInputs = ({
  index,
  item,
  handleRemoveComponent,
  handleTitleChange,
  handleDescChange,
  titleError,
}) => {
  // Initialisations 👇
  // ----------------
  // Functions 👇

  const handleRemove = () => {
    handleRemoveComponent(index)
  }

  const handleTitleUpdate = (e) => {
    handleTitleChange(index, e)
  }

  const handleDescriptionUpdate = (val) => {
    handleDescChange(index, val)
  }

  // ----------------
  // Sub Components 👇
  // ----------------
  // Final Return Statement 👇
  return (
    <div className="basic-border tw-mt-2 tw-p-2">
      <Button
        className="tw-ml-auto"
        type="bordered"
        onClick={() => handleRemove()}
      >
        Remove
      </Button>
      <Input
        variant={Boolean(titleError) ? "error" : "bordered"}
        className='tw-mt-2'
        type="text"
        value={item.title}
        onChange={(e) => handleTitleUpdate(e)}
        placeHolder="Title"
        errorMessage={titleError}
      />
      <RichTextEditor value={item?.desc} index={index} onChange={(val) => handleDescriptionUpdate(val)} />
    </div>
  )
  // ----------------
}
export default NavItemInputs
