"use client";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import SaveOptions from "../ak/SaveOptions";
import Error from "../ui/error";
import { useSettingsStore } from "@/store/settings.store";

function CompanyInformation() {
  const { companyDetailsCard, setCompanyDetailsCard } = useSettingsStore();

  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="font-medium -mb-2">Company Information</h1>
        <SaveOptions onSave={() => {}} onCancel={() => {}} />
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="business">Business Name</Label>
            <Input
              type="text"
              id="business"
              placeholder="e.g. Amul, Nestlé, Tropicana "
              className={cn("2xl:text-lg")}
            />
            <Error error="Error here" />
          </div>
          <div className="w-full">
            <Label htmlFor="lastName">
              GST No{" "}
              <span className="text-gray-500 text-xs md:text-sm">
                (optional)
              </span>
            </Label>
            <Input
              type="text"
              id="lastName"
              placeholder="e.g. 22AAAAA0000A1Z5"
              className={cn("2xl:text-lg")}
            />
            <Error error="Error here" />
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">About your business</Label>
          <Textarea
            placeholder="e.g. We are a local bakery specializing in artisanal breads and pastries."
            id="description"
            className="h-40 overflow-y-auto"
          />
          <Error error="Error here" />
        </div>
        <div className="w-full">
          <Label htmlFor="website">Company Website</Label>
          <Input
            type="url"
            id="website"
            placeholder="e.g. https://www.delanki.com"
            className={cn("2xl:text-lg")}
          />
          <Error error="Error here" />
        </div>
      </div>
    </div>
  );
}

export default CompanyInformation;
