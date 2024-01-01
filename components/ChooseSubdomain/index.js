import React, { useEffect, useState } from 'react'
import Input from '../common/Input'
import { debounce } from '@/utilities/common'
import { useSelector } from 'react-redux'
import { Switch, useToast } from '@chakra-ui/react'
import { checkSubDomainAvailability, setPortfolio } from '@/utilities/api'
import { useDebounce } from 'use-debounce'
import Button from '../common/Button'
import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'
import { useRouter } from 'next/router'

const ChooseSubdomain = () => {
  // ! Make it better
  const toast = useToast()
  const [variant, setVariant] = useState('bordered')
  const { user, templates } = useSelector((state) => state)
  const { _id } = user?.data
  const [subdomainName, setSubdomainName] = useState(templates?.subDomain)
  const { nextStep } = useStepperWithRedux()
  const [btnText, setBtnText] = useState(
    templates?.subDomain ? 'Update' : 'Publish'
  )
  const [debouncedValue] = useDebounce(subdomainName, 500)
  const router = useRouter()

  useEffect(() => {
    handleSubdomainCheck(debouncedValue)
  }, [debouncedValue])

  const handleSubdomainChange = (e) => {
    setSubdomainName(e?.target?.value)
  }

  const handleSubdomainCheck = async (name) => {
    if (name?.length > 2 && name !== templates?.subDomain) {
      await checkSubDomainAvailability(name).then((res) => {
        if (res.status === 'success') {
          if (res.available) {
            toast({
              title: 'Yep',
              description: `${name} is available`,
              status: 'success'
            })
          } else {
            setVariant('error')
          }
        }
      })
    }
  }

  const handlePublish = () => {
    const payload = {
      is_published: true,
      subdomain: subdomainName
    }
    if (subdomainName.length > 2) {
      setPortfolio(_id, payload).then((res) => {
        console.log(res)
        // ! Got to dispatch/update the shit in redux : might as well make a thunk for user update.
        toast({
          title: 'SUCCESS',
          description: 'Username set successfully',
          status: 'success'
        })
        nextStep()
        router.push(`https://${subdomainName}.flashweb.in`)
      })
    } else {
      toast({
        title: 'ERROR',
        description: 'Username must be of more than 3 characters',
        status: 'error'
      })
    }
  }

  return (
    <div className="tw-flex tw-items-start tw-justify-center tw-gap-5">
      <div>
        <Input
          value={subdomainName}
          className="tw-max-w-sm"
          placeHolder="Enter Subdomain of your choice..."
          variant={variant}
          errorMessage="oops! subdomain already taken!"
          onChange={handleSubdomainChange}
        />
      </div>
      <Button type={'bordered'} onClick={handlePublish}>
        {btnText}
      </Button>
    </div>
  )
}

export default ChooseSubdomain
