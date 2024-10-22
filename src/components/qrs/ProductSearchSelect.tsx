import { ChangeEvent, useState } from "react";
import { Select, SelectContent, SelectItem, SelectJSXItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import ProductCard from "./ProductCard";

export const ProductSearchSelect = ({ options, product, onChange }: {
    options: Product[];
    product: Product | undefined;
    onChange: (product: Product) => void;
}) => {

    const [value, setValue] = useState(product?.title || "")
    const filteredOptions = options.filter((option: Product) => {
        if (value) {
            return option.title.toLowerCase().includes(value.toLowerCase()) || option.category.name.toLowerCase().includes(value.toLowerCase())
        }
    });

    return (
        <Select defaultValue={product?.id?.toString() || ""}
            value={product?.id?.toString()}
            onValueChange={(id) => {
                let product = options.find((product: Product) => id === product.id.toString()) as Product
                setValue(product.title || "")
                onChange(product)
            }}
        >
            <SelectTrigger>
                {
                    value ?
                        value
                        :

                        <SelectValue placeholder="Select an option" />
                }
            </SelectTrigger>
            <SelectContent>
                <Input
                    placeholder="Search..."
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setValue(e.target.value) }}
                    className="mb-2"
                />
                {filteredOptions.map((option: Product) => (
                    <SelectJSXItem defaultChecked={product?.id == option.id} key={option.id} value={option.id?.toString()} textValue={value}>
                        <ProductCard product={option} />
                    </SelectJSXItem>
                ))}
            </SelectContent>
        </Select>
    )
}
