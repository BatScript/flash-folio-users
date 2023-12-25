import Layout from '@/components/common/Layout'
import FlashFolioMeta from '@/components/Seo/Meta'
import TemplateGrid from '@/components/TemplateGrid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTemplates } from '@/thunk/templateThunk'

const CreatePortfolio = () => {
  const dispatch = useDispatch()
  const templates = useSelector((state) => state.templates.data)

  useEffect(() => {
    dispatch(fetchTemplates())
  }, [dispatch])

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
        <TemplateGrid templates={templates} />
      </Layout>
    </>
  )
}

export default CreatePortfolio
