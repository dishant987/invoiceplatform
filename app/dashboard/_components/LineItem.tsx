import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface LineItemProps {
  index: number;
  remove: (index: number) => void;
}

export function LineItem({ index, remove }: LineItemProps) {
  const { register, watch, setValue, getValues } = useFormContext();
  const quantity = watch(`lineItems.${index}.quantity`) || 0;
  const rate = watch(`lineItems.${index}.rate`) || 0;

  useEffect(() => {
    const amount = Number(quantity) * Number(rate);
    setValue(`lineItems.${index}.amount`, amount.toFixed(2));

    // Trigger recalculation in the parent form
    const lineItems = getValues("lineItems");
    const subTotal = lineItems.reduce(
      (acc: number, item: { quantity: number; rate: number }) => {
        return acc + Number(item.quantity) * Number(item.rate);
      },
      0
    );
    setValue("subTotal", parseFloat(subTotal.toFixed(2)));
    setValue("total", parseFloat(subTotal.toFixed(2))); // Update total here if taxes are included
  }, [quantity, rate, index, setValue, getValues]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 items-end mb-4">
      <div className="w-full">
        <Label htmlFor={`lineItems.${index}.description`}>Description</Label>
        <Input {...register(`lineItems.${index}.description`)} />
      </div>
      <div className="w-full">
        <Label htmlFor={`lineItems.${index}.quantity`}>Quantity</Label>
        <Input
          type="number"
          min="0"
          {...register(`lineItems.${index}.quantity`, { valueAsNumber: true })}
        />
      </div>
      <div className="w-full">
        <Label htmlFor={`lineItems.${index}.rate`}>Rate</Label>
        <Input
          type="number"
          step={0.01}
          min={0}
          {...register(`lineItems.${index}.rate`, { valueAsNumber: true })}
        />
      </div>
      <div className="w-full">
        <Label htmlFor={`lineItems.${index}.amount`}>Amount</Label>
        <Input
          type="number"

          min={0}
          {...register(`lineItems.${index}.amount`, { valueAsNumber: true })}
          readOnly
        />
      </div>
      <div className="w-full">
        <Button variant={"destructive"} onClick={() => remove(index)}>
          Remove
        </Button>
      </div>
    </div>
  );
}
