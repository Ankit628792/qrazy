import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "./select";
import { Input } from "./input";
import { useState } from "react";

export type Option = {
    label: string;
    value: string;
    id: string | number;
};

const SearchSelect = ({
    options,
    selectedValue,
    onChange,
}: {
    options: Option[];
    selectedValue?: string;
    onChange: (option: Option) => void;
}) => {
    const [value, setValue] = useState(selectedValue || "");

    const filteredOptions = options.filter((option: Option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
    );

    return (
        <Select
            defaultValue={selectedValue}
            value={selectedValue}
            onValueChange={(id) => {
                const option = options.find(
                    (item: Option) => id === item.id.toString()
                ) as Option;
                setValue(option.value || "");
                onChange(option);
            }}
        >
            {" "}
            <SelectTrigger>
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                <Input
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="mb-2"
                />
                {filteredOptions.map((option: Option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SearchSelect;

