import SaveOptions from "@/components/ak/SaveOptions"
import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import { Label } from "@/components/ui/label"
import SearchSelect from "@/components/ui/search-select"
import { useState } from "react"
import AddCategory from "./AddCategory";

const options = [
    { id: 1, value: '1', label: 'Option 1' },
    { id: 2, value: '2', label: 'Option 2' },
    { id: 3, value: '3', label: 'Option 3' },
];

function Category() {
    const [category, setCategory] = useState<Option | null>();
    const [showAddCategory, setShowAddCategory] = useState(false);
    return (
        <>
            <div className='manage-product-element flex-grow'>
                <div className='px-2 flex items-center justify-between'>
                    <h1 className='input-wrapper-title'>Category</h1>
                    <SaveOptions onSave={() => { }} onCancel={() => { }} />
                </div>
                <div className='input-wrapper flex-grow justify-between'>
                    <div className="w-full">
                        <Label htmlFor="category">Product Category</Label>
                        <SearchSelect selectedValue={category?.value} onChange={setCategory} options={options} />
                        <Error error="Error here" />
                    </div>

                    <div className=" text-right">
                        <p className="py-2 text-xs sm:text-sm">Not have your product category?</p>
                        <Button onClick={() => setShowAddCategory(true)} className="bg-emerald-500 hover:bg-emerald-600 rounded-full text-white">
                            Create your own
                        </Button>
                    </div>
                </div>
            </div>
            {showAddCategory ? <AddCategory onClose={() => setShowAddCategory(false)} onSuccess={() => { setShowAddCategory(false) }} /> : <></>}
        </>
    )
}

export default Category