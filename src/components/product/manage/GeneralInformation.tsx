import SaveOptions from "@/components/ak/SaveOptions"
import Error from "@/components/ui/error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

function GeneralInformation() {
    return (
        <div className='manage-product-element'>
            <div className='px-2 flex items-center justify-between'>
                <h1 className='input-wrapper-title'>General Information</h1>
                <SaveOptions onSave={() => { }} onCancel={() => { }} />
            </div>
            <div className='input-wrapper'>
                <div className="w-full">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Product title here..." className={cn('2xl:text-lg')} />
                    <Error error="Error here" />
                </div>
                <div className="w-full">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="About your product..." className={cn('2xl:text-lg')} />
                    <Error error="Error here" />
                </div>
            </div>
        </div>
    )
}

export default GeneralInformation