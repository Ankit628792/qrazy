import SaveOptions from "@/components/ak/SaveOptions";
import Error from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  useProductDetailsStore,
  useProductErrorsStore,
} from "@/store/product.store";

function GeneralInformation({}) {
  const { title, description, setTitle, setDescription } =
    useProductDetailsStore();

  const { errors, setError } = useProductErrorsStore();

  return (
    <div className="manage-product-element">
      <div className="px-2 flex items-center justify-between">
        <h1 className="input-wrapper-title">General Information</h1>
        <SaveOptions onSave={() => {}} onCancel={() => {}} />
      </div>
      <div className="input-wrapper">
        <div className="w-full">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Product title here..."
            name="title"
            className={cn("2xl:text-lg")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setError("title", "")}
          />
          {errors.title && <Error error={errors.title} />}
        </div>
        <div className="w-full">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="About your product..."
            name="description"
            className={cn("2xl:text-lg")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setError("description", "")}
          />
          {errors.description && <Error error={errors.description} />}
        </div>
      </div>
    </div>
  );
}

export default GeneralInformation;
