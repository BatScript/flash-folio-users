import { Button } from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
export default function AuthSection() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div>
        <img
          className="tw-rounded-full tw-w-12 tw-cursor-pointer"
          src={session?.user?.image || ''}
          alt="user_profile"
        ></img>
      </div>
    )
  }
  return (
    <div className="tw-border-1 tw-border-solid">
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  )
}
