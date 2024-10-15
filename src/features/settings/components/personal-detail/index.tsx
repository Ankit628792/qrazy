import Error from '@/shadcn-ui/error'
import { cn } from '@/libs/utils'
import { Input } from '@/shadcn-ui/input'
import { Label } from '@/shadcn-ui/label'
import { SaveOptionsComponent } from '../save-options'

export const PersonalDetailComponent = () => {
  return (
    <div className="flex flex-col gap-3 pt-1 pb-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="font-medium -mb-2">Personal Details</h1>
        <SaveOptionsComponent onSave={() => {}} onCancel={() => {}} />
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="fName">First Name</Label>
            <Input
              id="fName"
              placeholder="Type here..."
              className={cn('2xl:text-lg')}
            />
            <Error error="Error here" />
          </div>
          <div className="w-full">
            <Label htmlFor="lName">Last Name</Label>
            <Input
              id="lName"
              placeholder="Type here..."
              className={cn('2xl:text-lg')}
            />
            <Error error="Error here" />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={'contact@delanki.com'}
            disabled
            placeholder="Enter your email"
            className={cn('2xl:text-lg')}
          />
        </div>
      </div>
    </div>
  )
}
