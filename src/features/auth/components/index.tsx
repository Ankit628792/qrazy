import { LoginComponent } from './login'
import { RegisterComponent } from './register'
import { AuthBackgroundWrapper } from './background-wrapper'
import { CURRENT_AUTH_STEP } from '../auth.interface'
import { VerifyEmail } from './verify'
import { ForgotPasswordComponent } from './forgot-password'
import { ResetPasswordComponent } from '@/features/settings/components/reset-password'

type getRenderComponentProps = {
  currentAuthStep: CURRENT_AUTH_STEP
  setCurrentAuthStep: (value: CURRENT_AUTH_STEP) => void
}

type tabComponentProps = {
  setCurrentAuthStep: (value: CURRENT_AUTH_STEP) => void
}

const LoginTabComponent = ({ setCurrentAuthStep }: tabComponentProps) => {
  return (
    <AuthBackgroundWrapper type={CURRENT_AUTH_STEP.LOGIN}>
      <h1 className="text-4xl font-bold select-none mb-2">Welcome Back!</h1>
      <LoginComponent />
      <div className="text-sm xl:text-base flex items-center justify-center">
        <p>Don&apos;t have an account?</p>
        <div
          onClick={() => setCurrentAuthStep(CURRENT_AUTH_STEP.REGISTER)}
          className="cursor-pointer text-emerald-500 px-1 font-medium"
        >
          Register
        </div>
      </div>
      <div className="flex">
        <div
          onClick={() => setCurrentAuthStep(CURRENT_AUTH_STEP.FORGOT_PASSWORD)}
          className="cursor-pointer text-emerald-500 px-1 font-medium"
        >
          Forgot Password
        </div>
        <div
          onClick={() => setCurrentAuthStep(CURRENT_AUTH_STEP.VERIFY_EMAIL)}
          className="cursor-pointer text-emerald-500 px-1 font-medium"
        >
          Verify Email
        </div>
        <div
          onClick={() => setCurrentAuthStep(CURRENT_AUTH_STEP.RESET_PASSWORD)}
          className="cursor-pointer text-emerald-500 px-1 font-medium"
        >
          Reset Password
        </div>
      </div>
    </AuthBackgroundWrapper>
  )
}

const RegisterTabComponent = ({ setCurrentAuthStep }: tabComponentProps) => {
  return (
    <AuthBackgroundWrapper type={CURRENT_AUTH_STEP.REGISTER}>
      <RegisterComponent />
      <div className="text-sm xl:text-base flex items-center justify-center">
        <p>Already have an account?</p>
        <div
          onClick={() => setCurrentAuthStep(CURRENT_AUTH_STEP.LOGIN)}
          className="cursor-pointer text-emerald-500 px-1 font-medium"
        >
          Login
        </div>
      </div>
    </AuthBackgroundWrapper>
  )
}

const ForgotPasswordTabComponent = ({
  setCurrentAuthStep
}: tabComponentProps) => {
  return <ForgotPasswordComponent />
}

const ResetPasswordTabComponent = ({
  setCurrentAuthStep
}: tabComponentProps) => {
  return <ResetPasswordComponent />
}

const VerifyEmailTabComponent = ({ setCurrentAuthStep }: tabComponentProps) => {
  return <VerifyEmail />
}

const getRenderComponent = ({
  currentAuthStep,
  setCurrentAuthStep
}: getRenderComponentProps) => {
  switch (currentAuthStep) {
    case CURRENT_AUTH_STEP.LOGIN:
      return <LoginTabComponent setCurrentAuthStep={setCurrentAuthStep} />
    case CURRENT_AUTH_STEP.REGISTER:
      return <RegisterTabComponent setCurrentAuthStep={setCurrentAuthStep} />
    case CURRENT_AUTH_STEP.FORGOT_PASSWORD:
      return (
        <ForgotPasswordTabComponent setCurrentAuthStep={setCurrentAuthStep} />
      )
    case CURRENT_AUTH_STEP.RESET_PASSWORD:
      return (
        <ResetPasswordTabComponent setCurrentAuthStep={setCurrentAuthStep} />
      )
    case CURRENT_AUTH_STEP.VERIFY_EMAIL:
      return <VerifyEmailTabComponent setCurrentAuthStep={setCurrentAuthStep} />
    default:
      return <LoginTabComponent setCurrentAuthStep={setCurrentAuthStep} />
  }
}

export default getRenderComponent
