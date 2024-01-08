import Layout from '@/components/common/Layout'
import FlashFolioMeta from '@/components/Seo/Meta'
import BuildJourney from '@/components/BuildJourney'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { fetchAllTemplates } from '@/thunk/templatesThunk'
import { fetchPortfolio } from '@/thunk/portfolioThunk'
import Loader from '@/components/common/Loader'

const CreatePortfolio = () => {
  const { templates } = useSelector((state) => state)
  const { allTemplates, portfolio } = templates
  const { data = {}, status } = useSession()
  const { user = {} } = data
  const dispatch = useDispatch()
  const isLoading =
    status !== 'authenticated' &&
    allTemplates.status === 'succeeded' &&
    portfolio.status === 'succeeded'

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(fetchAllTemplates())
      dispatch(fetchPortfolio(user?._id))
    }
  }, [status])

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
        {isLoading ? <Loader /> : <BuildJourney />}
      </Layout>
    </>
  )
}

export default CreatePortfolio
