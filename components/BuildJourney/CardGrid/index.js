import Button from '@/components/common/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  CaretRightFill,
  CheckCircleFill,
  PlusCircleFill
} from 'react-bootstrap-icons'
import Image from 'next/image'
import Card from '@/components/common/Card'
import { useSelector } from 'react-redux'
import { useStepperWithRedux } from '@/hooks/useStepperWithRedux'
const CardGrid = ({ cardContent }) => {
  const { data: session, status } = useSession()

  const selectedTemplate = useSelector(
    (state) => state?.templates?.portfolio?.selectedTemplate
  )

  const { goToStep } = useStepperWithRedux()

  const selected = selectedTemplate === cardContent?._id

  const router = useRouter()

  const { user } = useSelector((state) => state)
  const { data } = user

  const templateSelectTrigger = async (_id) => {
    //  todo : Thunkify this shit
    dispatch(
      updatePortFolio({
        user_id: data?._id,
        payload: {
          template_id: _id
        }
      })
    ).then((res) => {
      if (res.status === 'created') {
        goToStep(1)
      } else {
        console.log('error')
      }
    })
    // await setPortfolio(data?._id, {
    //   template_id: _id
    // }).then((res) => {
    //   if (res.status === 'created') {
    //     goToStep(1)
    //   } else {
    //     console.log('error')
    //   }
    // })
  }

  return (
    <Card hasPadding={true} hasBorder={true} maxWidth={400}>
      <div>
        <Image
          src={cardContent?.content?.img}
          width={400}
          height={160}
          alt="portfolio_snapshot"
        />
      </div>
      <p className="tw-mt-1">
        <strong>{cardContent?.name}</strong>
      </p>
      <p dangerouslySetInnerHTML={{ __html: cardContent?.description }} />
      <div className="tw-mt-1 tw-flex tw-justify-between tw-gap-2">
        <Button
          className="tw-w-full"
          type="hoverAnimation"
          onClick={() => router.push(cardContent?.previewUrl)}
        >
          <span>Preview</span>&nbsp;
          <CaretRightFill />
        </Button>
        <Button
          theme="light"
          className={`tw-w-full ${
            selected || status !== 'authenticated'
              ? 'tw-cursor-not-allowed'
              : 'tw-cursor-pointer'
          }`}
          type={
            selected || status !== 'authenticated'
              ? 'bordered'
              : 'hoverAnimation'
          }
          onClick={() => templateSelectTrigger(cardContent._id)}
          isDisabled={status !== 'authenticated' || selected}
        >
          <span>{selected ? 'Selected' : 'Use'}</span>
          &nbsp;
          {selected ? <CheckCircleFill /> : <PlusCircleFill />}
        </Button>
      </div>
    </Card>
  )
}

export default CardGrid
