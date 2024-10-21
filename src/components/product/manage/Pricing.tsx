import SaveOptions from "@/components/ak/SaveOptions";
import Error from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  useProductDetailsStore,
  useProductErrorsStore,
} from "@/store/product.store";

function Pricing() {
  const { mrp, mrl, setMrp, setMrl } = useProductDetailsStore();
  const { errors, setError } = useProductErrorsStore();
  return (
    <div className="manage-product-element">
      <div className="px-2 flex items-center justify-between">
        <h1 className="input-wrapper-title">Pricing</h1>
        <SaveOptions onSave={() => {}} onCancel={() => {}} />
      </div>
      <div className="input-wrapper">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="mrp">Maximum Retail Price</Label>
            <Input
              id="mrp"
              placeholder="Type here..."
              type="number"
              className={cn("2xl:text-lg")}
              value={mrp}
              onChange={(e) => {
                const value = e.target.value;
                setMrp(Number(value));
              }}
              onFocus={() => setError("mrp", "")}
            />
            {errors.mrp && <Error error={errors.mrp} />}
          </div>
          <div className="w-full">
            <Label htmlFor="mrl">Maximum Reward Limit</Label>
            <Input
              id="mrl"
              placeholder="Type here..."
              className={cn("2xl:text-lg")}
              type="number"
              value={mrl}
              onChange={(e) => {
                const value = e.target.value;
                setMrl(Number(value));
              }}
              onFocus={() => setError("mrl", "")}
            />
            {errors.mrl && <Error error={errors.mrl} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
