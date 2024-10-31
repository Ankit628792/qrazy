import SaveOptions from "@/components/ak/SaveOptions";
import Error from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { usePricingStore, useProductErrorsStore } from "@/store/product.store";

function Pricing() {
  const { mrp, mrl, setMrp, setMrl } = usePricingStore();
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
              type="number"
              id="mrp"
              placeholder="Type here..."
              className={cn("2xl:text-lg")}
              value={mrp === 0 ? "" : mrp}
              step="0.01"
              onChange={(e) => {
                const value = e.target.value;
                setMrp(value ? parseFloat(value) : 0);
              }}
              onFocus={() => setError("mrp", "")}
            />
            <Error error={errors.mrp} />
          </div>
          <div className="w-full">
            <Label htmlFor="mrl">Maximum Reward Limit</Label>
            <Input
              type="number"
              id="mrl"
              placeholder="Type here..."
              className={cn("2xl:text-lg")}
              value={mrl === 0 ? "" : mrl}
              step="0.01"
              onChange={(e) => {
                const value = e.target.value;
                setMrl(value ? parseFloat(value) : 0);
              }}
              onFocus={() => setError("mrl", "")}
            />
            <Error error={errors.mrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
