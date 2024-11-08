import SaveOptions from '@/components/ak/SaveOptions'
import { Button } from '@/components/ui/button'
import Error from '@/components/ui/error'
import { Label } from '@/components/ui/label'
import SearchSelect from '@/components/ui/search-select'
import { useState } from 'react'
import AddCategory from './AddCategory'
import { useCategoryStore, useProductErrorsStore } from '@/store/product.store'

const options = [
  { id: 1, value: 'Electronic', label: 'Electronic' },
  { id: 2, value: 'Clothing', label: 'Clothing' },
  { id: 3, value: 'Beauty Product', label: 'Beauty Product' }
]

function Category() {
  const { category, setCategory } = useCategoryStore()
  const { errors, setError } = useProductErrorsStore()
  const [showAddCategory, setShowAddCategory] = useState(false)

  const handleSelect = (option: Option) => {
    const newCategory = {
      id: option.id,
      name: option.value,
      description: option.value
    }
    setCategory(newCategory)
    setError('category.name', '')
  }

  return (
    <>
      <div className="manage-product-element flex-grow">
        <div className="px-2 flex items-center justify-between">
          <h1 className="input-wrapper-title">Category</h1>
          <SaveOptions onSave={() => { }} onCancel={() => { }} />
        </div>
        <div className="input-wrapper flex-grow justify-between">
          <div className="w-full">
            <Label htmlFor="category">Product Category</Label>
            <SearchSelect
              options={options}
              initialValue={category.name}
              onChange={handleSelect}
            />
            {errors['category.name'] && (
              <Error error={errors['category.name']} />
            )}
          </div>

          <div className=" text-right">
            <p className="py-2 text-xs sm:text-sm">
              Not have your product category?
            </p>
            <Button
              onClick={() => setShowAddCategory(true)}
              className="bg-emerald-500 hover:bg-emerald-600 rounded-full text-white"
            >
              Create your own
            </Button>
          </div>
        </div>
      </div>
      {showAddCategory ? (
        <AddCategory
          onClose={() => setShowAddCategory(false)}
          onSuccess={() => {
            setShowAddCategory(false)
          }}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default Category
