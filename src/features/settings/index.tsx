import { ResetPassword } from '../auth/components/reset-password'
import { CompanyContactComponent } from './components/company-contact'
import { CompanyInformationComponent } from './components/company-information'
import { PersonalDetailComponent } from './components/personal-detail'
import { ProfileCardComponent } from './components/profile-card'

export const SettingsComponent = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:max-w-xs xl:max-w-sm flex flex-col gap-2.5">
        <ProfileCardComponent />
        <ResetPassword />
      </div>
      <div className="flex-grow flex flex-col gap-2 rounded-3xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-3">
        <PersonalDetailComponent />
        <CompanyInformationComponent />
        <CompanyContactComponent />
      </div>
    </section>
  )
}
