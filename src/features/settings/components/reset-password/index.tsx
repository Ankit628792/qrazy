import { Button } from '@/shadcn-ui/button'
import { Input } from '@/shadcn-ui/input'
import { Label } from '@/shadcn-ui/label'

export const ResetPasswordComponent = () => {
  return (
    <div className="w-full rounded-3xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-3 sticky top-72">
      <div className="pt-1 px-2 pb-3">
        <h1 className="font-medium">Password Setting</h1>
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-0.5">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type="password"
            id="currentPassword"
            placeholder="Type here..."
          />
          <p className="error">{'Error here'}</p>
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            placeholder="Must contain alphanumeric, special & min 8 chars"
          />
          <p className="error">{'Error here'}</p>
        </div>
        <div>
          <Label htmlFor="confirmPassword">Re-enter Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Verify your password"
          />
          <p className="error">{'Show Error here'}</p>
        </div>
        <hr className="my-1" />
        <Button className="w-full">
          <span className="">Save</span>
        </Button>
      </div>
    </div>
  )
}
