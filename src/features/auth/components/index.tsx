import { Button, Container } from '@/components'
import { LoginComponent } from './login'
import { RegisterComponent } from './register'
import { AuthBackgroundWrapper } from './background-wrapper'
import { CURRENT_AUTH_STEP } from '../auth.interface'

type getRenderComponentProps = {
  isLoginTabActive: boolean
  setIsLoginTabActive: (value: boolean) => void
}

type tabComponentProps = {
  setIsLoginTabActive: (value: boolean) => void
}

const LoginTabComponent = ({ setIsLoginTabActive }: tabComponentProps) => {
  return (
    <AuthBackgroundWrapper type={CURRENT_AUTH_STEP.LOGIN}>
      <Container className="mb-8">
        <LoginComponent />
      </Container>
      <Container className="text-center flex items-center justify-center gap-2">
        <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
        <Button
          onClick={() => setIsLoginTabActive(false)}
          btnText="Register"
          btnType="tertiary"
        />
      </Container>
    </AuthBackgroundWrapper>
  )
}

const RegisterTabComponent = ({ setIsLoginTabActive }: tabComponentProps) => {
  return (
    <AuthBackgroundWrapper type={CURRENT_AUTH_STEP.REGISTER}>
      <Container className="mb-8">
        <RegisterComponent />
      </Container>
      <Container className="text-center flex items-center justify-center gap-2">
        <p className="text-sm text-gray-600">Already have an account?</p>
        <Button
          onClick={() => setIsLoginTabActive(true)}
          btnText="Login"
          btnType="tertiary"
        />
      </Container>
    </AuthBackgroundWrapper>
  )
}

const getRenderComponent = ({
  isLoginTabActive,
  setIsLoginTabActive
}: getRenderComponentProps) => {
  switch (isLoginTabActive) {
    case true:
      return <LoginTabComponent setIsLoginTabActive={setIsLoginTabActive} />
    case false:
      return <RegisterTabComponent setIsLoginTabActive={setIsLoginTabActive} />
    default:
      return <LoginTabComponent setIsLoginTabActive={setIsLoginTabActive} />
  }
}

export default getRenderComponent
