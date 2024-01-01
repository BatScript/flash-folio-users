import Layout from '@/components/common/Layout'
import FlashFolioMeta from '@/components/Seo/Meta'
import BuildJourney from '@/components/BuildJourney'
import React, { useEffect } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { getAllTemplates, getPortfolio } from '@/utilities/api'
import { useDispatch } from 'react-redux'
import {
  selectTemplate,
  setAllTemplates,
  setFormData,
  setSubdomain
} from '@/slice/templateSlice'

const CreatePortfolio = ({ templates, saved_template_data }) => {
  const defaultFormData = {
    name: '',
    profession: '',
    listItems: [{ title: '', desc: '' }]
  }
  const {
    template_id,
    user_id = '',
    template_data = defaultFormData,
    subdomain
  } = saved_template_data
  console.log('saved_template_data : ', saved_template_data)
  const dispatch = useDispatch()
  useEffect(() => {
    // * As soon as we have the data we set it into the redux
    dispatch(setAllTemplates(templates.data.map((template) => template._id)))
    dispatch(selectTemplate(template_id))
    dispatch(setFormData(template_data))
    dispatch(setSubdomain(subdomain))
  }, [])
  return (
    <>
      <Layout>
        <FlashFolioMeta
          title={`Flashfolio : Create`}
          siteName={'flashfolio'}
          type={'website'}
          canonical={'https"//portfolio.flashweb.in/create'}
          description={`Build your trendy and personalised portfolio website in few steps, without coding!`}
        />
        <BuildJourney templates={templates?.data} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const { user = {} } = session || {}

  const [templates, saved_template_data] = await Promise.all([
    getAllTemplates,
    getPortfolio(user._id)
  ])

  if (session) {
    return {
      props: {
        templates: JSON.parse(JSON.stringify(templates)),
        saved_template_data: JSON.parse(
          JSON.stringify(saved_template_data || {})
        )
      }
    }
  } else {
    return {
      redirect: {
        destination: '/'
      }
    }
  }
}

export default CreatePortfolio
