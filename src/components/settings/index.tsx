import React from 'react'
import PersonalDetail from './PersonalDetail';
import CompanyInformation from './CompanyInformation';
import CompanyContact from './CompanyContact';
import ProfileCard from './ProfileCard';
import ResetPassword from './ResetPassword';

function Settings() {
    return (
        <section className='flex flex-col lg:flex-row gap-4'>
            <div className='w-full lg:max-w-xs xl:max-w-sm flex flex-col gap-2.5'>
                <ProfileCard />
                <ResetPassword />
            </div>
            <div className='flex-grow flex flex-col gap-2 rounded-3xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-3'>
                <PersonalDetail />
                <CompanyInformation />
                <CompanyContact />
            </div>
        </section>
    )
}

export default Settings