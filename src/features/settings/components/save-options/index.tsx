import { cn } from '@/libs/utils'
import { Button } from '@/shadcn-ui/button'
import { Save, UndoDot } from 'lucide-react'

type SaveOptionsProps = Readonly<{
  onSave: () => void
  onCancel: () => void
  visible?: boolean
}>

export const SaveOptionsComponent = ({
  onSave,
  onCancel,
  visible = true
}: SaveOptionsProps) => {
  return (
    <div
      className={cn(
        'flex gap-4',
        visible ? '' : 'opacity-0 invisible select-none'
      )}
    >
      <Button
        disabled={!visible}
        onClick={onSave}
        size={'sm'}
        className="bg-emerald-500 hover:bg-sky-600 dark:text-white"
      >
        <Save className="w-4 mr-2" />
        <span>Save</span>
      </Button>
      <Button disabled={!visible} onClick={onCancel} size={'sm'}>
        <UndoDot className="w-4 mr-2" />
        <span>Cancel</span>
      </Button>
    </div>
  )
}
