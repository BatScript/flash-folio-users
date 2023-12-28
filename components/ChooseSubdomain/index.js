import React, { useState } from 'react'
import Input from '../common/Input'
import { debounce } from '@/utilities/common'
import Button from '../common/Button'
import { useSelector } from 'react-redux'
import { Switch } from '@chakra-ui/react'
import { setPortfolio } from '@/utilities/api'

const ChooseSubdomain = () => {
  // ! Make it better
  const [variant, setVariant] = useState('bordered')
  const [isPublished, setIspublished] = useState(false)
  const [name, setName] = useState('')
  const { _id } = useSelector((state) => state.user.data)
  const handleDomainCheck = (e) => {
    setName(e.target.value)
    fetch(`/api/subdomain?name=${e.target.value}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          if (res.available) {
            setVariant('bordered')
          } else {
            setVariant('error')
          }
        }
      })
  }

  const handlePublishToggle = () => {
    setIspublished((prev) => !prev)
    const payload = {
      user_id: _id,
      is_published: isPublished,
      subdomain: name
    }
    if (name.length > 0) {
      setPortfolio(payload)
    }
  }
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-gap-5">
      <Input
        className="tw-max-w-sm"
        placeHolder="Enter Subdomain of your choice..."
        variant={variant}
        errorMessage="oops! subdomain already taken!"
        onChange={debounce((e) => handleDomainCheck(e), 400)}
      />

      <Switch size="lg" onClick={handlePublishToggle} />
    </div>
  )
}

export default ChooseSubdomain
