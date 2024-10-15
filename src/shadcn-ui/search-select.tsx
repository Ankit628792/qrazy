import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';
import { Input } from './input';

type Option = {
    label: string;
    value: string;
    id: string | number;
}

const SearchSelect = ({ options, value, onChange }: {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}) => {

    const filteredOptions = options.filter((option: Option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
    );

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                <Input
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
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
