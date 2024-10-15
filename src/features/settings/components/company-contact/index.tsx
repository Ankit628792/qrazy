import Error from '@/shadcn-ui/error'
import SearchSelect from '@/shadcn-ui/search-select'
import useSettingsStore from '../../store/settings.store'
import { useState } from 'react'
import { SaveOptionsComponent } from '../save-options'
import { Label } from '@/shadcn-ui/label'
import { Input } from '@/shadcn-ui/input'
import { cn } from '@/libs/utils'

export const CompanyContactComponent = () => {
  const { countryDropdownData } = useSettingsStore()
  const [country, setCountry] = useState<string>('')

  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="font-medium -mb-2">Company Contact</h1>
        <SaveOptionsComponent visible onSave={() => {}} onCancel={() => {}} />
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="e.g. 123 Main St, New Delhi"
            className={cn('2xl:text-lg')}
          />
          <Error error="Error here" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="pinCode">Pin Code</Label>
            <Input
              type="text"
              id="pinCode"
              placeholder="e.g. 110053"
              className={cn('2xl:text-lg')}
            />
            <Error error="Error here" />
          </div>
          <div className="w-full">
            <Label htmlFor="location">Country</Label>
            <SearchSelect
              value={country}
              onChange={setCountry}
              options={countryDropdownData}
            />
            <Error error="Error here" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              type="text"
              id="contactEmail"
              placeholder="e.g. contact@delanki.com"
              className={cn('2xl:text-lg')}
            />
            <Error error="Error here" />
          </div>
          <div className="w-full">
            <Label htmlFor="contactNumber">
              Contact Number{' '}
              <span className="text-xs italic text-right opacity-50">
                (* include country code)
              </span>
            </Label>
            <Input
              type="tel"
              id="contactNumber"
              placeholder="e.g. +911234567890"
              className={cn('2xl:text-lg')}
            />
            <Error error="Error here" />
          </div>
        </div>
      </div>
    </div>
  )
}
