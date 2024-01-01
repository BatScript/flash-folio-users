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
const CardGrid = ({ cardContent, templateSelectTrigger }) => {
  const { data: session, status } = useSession()

  const selectedTemplate = useSelector(
    (state) => state?.templates?.selectedTemplate
  )

  const selected = selectedTemplate === cardContent?._id

  const router = useRouter()

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
