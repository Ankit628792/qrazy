import { Button, Container } from '@/components'
import { LoginComponent } from './login'
import { RegisterComponent } from './register'
import { AuthBackgroundWrapper } from './background-wrapper'
import { CURRENT_AUTH_STEP } from '../auth.interface'
import Link from 'next/link'

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
      <h1 className="text-4xl font-bold select-none mb-2">Welcome Back!</h1>
      <LoginComponent />
      <div className="text-sm xl:text-base flex items-center justify-center">
        <p>Don&apos;t have an account?</p>
        <div
          onClick={() => setIsLoginTabActive(false)}
          className="text-emerald-500 px-1 font-medium"
        >
          Register
        </div>
      </div>
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
