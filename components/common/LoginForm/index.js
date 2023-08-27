import Button from '../Button'
import Input from '../Input'

const LoginForm = ({ prop }) => {
  // Initialisations 👇
  // ----------------
  // Functions 👇
  // ----------------
  // Sub Components 👇
  // ----------------
  // Final Return Statement 👇
  return (
    <div className="tw-p-2">
      <Input
        type="text"
        variant="bordered"
        placeHolder="Username"
        theme={'light'}
      />
      <Input
        className="mt-2"
        type="password"
        variant="bordered"
        placeHolder="Password"
        theme={'light'}
      />
      <Button type="bordered" theme={'light'}>
        Submit
      </Button>
    </div>
  )
  // ----------------
}
export default LoginForm
