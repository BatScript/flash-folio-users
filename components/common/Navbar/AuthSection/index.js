import { Button } from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { updateUserData } from '@/slice/userSlice'
import { useEffect } from 'react'
export default function AuthSection() {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(updateUserData(session.user))
    }
  }, [session])

  if (session) {
    return (
      <div onClick={signOut}>
        <img
          className="tw-rounded-full tw-w-12 tw-cursor-pointer"
          src={session?.user?.image || ''}
          alt="user_profile"
        ></img>
      </div>
    )
  }

  const handleLogin = async () => {
    signIn()
  }
  return (
    <div className="tw-border-1 tw-border-solid">
      <Button onClick={handleLogin}>Sign in</Button>
    </div>
  )
}
