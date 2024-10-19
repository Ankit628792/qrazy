import PopUp from "@/components/ak/PopUp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Error from "@/components/ui/error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Tooltip from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { CheckCircle, XIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const AddCategory = ({ onClose, onSuccess }: {
    onClose: () => void,
    onSuccess: (category: Category) => void,
}) => {
    const [category, setCategory] = useState<Category>({
        name: '',
        description: '',
    });

    const handleSubmit = () => {
        // Call your API here
        // After successful API call, call onClose()
        toast.promise(new Promise((resolve, reject) => {
            // Simulate API call
            setTimeout(() => {
                resolve("Category added successfully!");
            }, 1000);
        }), {
            loading: "Validating category",
            success: "Category added successfully!",
            error: "Failed to add category.",
        }).then(() => {
            onSuccess(category)
        }).catch(() => {
            // Handle error
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCategory({ ...category, [e.target.id]: e.target.value })
    }
    return (
        <PopUp onClose={onClose}>
            <Card className='w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl relative y-translate'>
                <div className='absolute top-3 right-3 p-2 pb-0 cursor-pointer' onClick={onClose}>
                    <Tooltip title='Cancel'>
                        <XIcon />
                    </Tooltip>
                </div>
                <CardHeader className='border-b pb-4'>
                    <CardTitle>Add Category</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4 pt-4'>
                    <div className="w-full">
                        <Label htmlFor="name" className='sm:text-lg'>Category Name</Label>
                        <Input id="name" value={category.name} onChange={handleChange} placeholder="Type here..." className={cn('2xl:text-lg')} />
                        <Error error="Error here" />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="description" className='sm:text-lg'>Category Description</Label>
                        <Textarea id="description" value={category.description} onChange={handleChange} placeholder="Type here..." className={cn('2xl:text-lg')} />
                        <Error error="Error here" />
                    </div>
                </CardContent>
                <CardFooter className='pt-8'>
                    <Button onClick={handleSubmit} size={"lg"} className='gap-2 ml-auto bg-emerald-500 hover:bg-emerald-600 text-white rounded-full'>
                        <CheckCircle />
                        <span>Add Category</span>
                    </Button>
                </CardFooter>
            </Card>
        </PopUp>
    )
}
export default AddCategory