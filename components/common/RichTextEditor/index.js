import React, { useState } from 'react'
import ReactQuill from 'react-quill'

const RichTextEditor = ({ index, onChange, value }) => {
  // const [val, setVal] = useState('')
  const changeHandler = (val) => {
    // setVal(val)
    onChange(val)
  }
  return (
    <>
      <ReactQuill
        placeholder={`Nav List Item Description. of Index : ${index}`}
        className="tw-mt-2"
        theme="snow"
        value={value}
        onChange={changeHandler}
      />
    </>
  )
}

export default RichTextEditor
