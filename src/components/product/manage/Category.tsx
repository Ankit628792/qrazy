import SaveOptions from "@/components/ak/SaveOptions";
import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import { Label } from "@/components/ui/label";
import SearchSelect, { Option } from "@/components/ui/search-select";
import { useState } from "react";
import AddCategory from "./AddCategory";
import {
  useProductDetailsStore,
  useProductErrorsStore,
} from "@/store/product.store";

const options = [
  { id: 1, value: "1", label: "Option 1" },
  { id: 2, value: "2", label: "Option 2" },
  { id: 3, value: "3", label: "Option 3" },
];

function Category() {
  const { category, setCategory } = useProductDetailsStore();
  const { errors, setError } = useProductErrorsStore();
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleSelect = (option: Option) => {
    const category = {
      id: option.id,
      name: option.label,
      description: option.value,
    };
    setCategory(category);
    setError("category.name", "");
  };

  return (
    <>
      <div className="manage-product-element flex-grow">
        <div className="px-2 flex items-center justify-between">
          <h1 className="input-wrapper-title">Category</h1>
          <SaveOptions onSave={() => {}} onCancel={() => {}} />
        </div>
        <div className="input-wrapper flex-grow justify-between">
          <div className="w-full">
            <Label htmlFor="category">Product Category</Label>
            <SearchSelect
              options={options}
              selectedValue={category.name}
              onChange={handleSelect}
            />
            {errors["category.name"] && (
              <Error error={errors["category.name"]} />
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
            setShowAddCategory(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Category;
