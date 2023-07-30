import Layout from '@/components/common/Layout'
import FlashFolioMeta from '@/components/Seo/Meta'
import TemplateGrid from '@/components/TemplateGrid'
import React from 'react'

const CreatePortfolio = () => {
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
        <TemplateGrid />
      </Layout>
    </>
  )
}

export default CreatePortfolio
