"use client"
import { Save, UndoDot } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const SaveOptions = ({ onSave, onCancel, visible = false }: {
    onSave: () => void,
    onCancel: () => void,
    visible?: boolean
}) => {
    return (
        <div className={cn('flex gap-2 sm:gap-4', visible ? "" : "opacity-0 invisible select-none")}>
            <Button disabled={!visible} onClick={onSave} size={"sm"} className='bg-emerald-500 hover:bg-sky-600 dark:text-white'>
                <Save className='w-4 mr-0.5 sm:mr-2' />
                <span>Save</span>
            </Button>
            <Button disabled={!visible} onClick={onCancel} size={"sm"}>
                <UndoDot className='w-4 mr-0.5 sm:mr-2' />
                <span>Cancel</span>
            </Button>
        </div>
    )
}
export default SaveOptions