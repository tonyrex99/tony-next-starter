"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { itemFormSchema, type ItemFormValues } from "../schemas/example.schema";
import { useCreateItemMutation } from "../queries/example.mutations";

export interface ExampleFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Archived", value: "archived" },
];

export function ExampleForm({ onSuccess, onCancel }: ExampleFormProps) {
  const createMutation = useCreateItemMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      category: "",
      amount: 0,
      status: "active",
      description: "",
    },
  });

  const onSubmit = async (values: ItemFormValues) => {
    await createMutation.mutateAsync({
      name: values.name,
      category: values.category,
      amount: values.amount,
      status: values.status,
      description: values.description,
    });
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FormField label="Item Name" required error={errors.name?.message}>
            <Input
              placeholder="e.g. Enterprise Cloud Node"
              isInvalid={Boolean(errors.name)}
              {...field}
            />
          </FormField>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormField label="Category" required error={errors.category?.message}>
              <Input
                placeholder="e.g. Infrastructure"
                isInvalid={Boolean(errors.category)}
                {...field}
              />
            </FormField>
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <FormField label="Amount ($)" required error={errors.amount?.message}>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                isInvalid={Boolean(errors.amount)}
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            </FormField>
          )}
        />
      </div>

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormField label="Status" required error={errors.status?.message}>
            <Select
              options={statusOptions}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormField>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <FormField label="Description (Optional)" error={errors.description?.message}>
            <Textarea placeholder="Additional notes about this item..." rows={3} {...field} />
          </FormField>
        )}
      />

      <div className="flex justify-end gap-2 pt-2 border-t border-default-200">
        {onCancel && (
          <Button variant="flat" onPress={onCancel} disabled={createMutation.isPending}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" isLoading={createMutation.isPending}>
          Create Item
        </Button>
      </div>
    </form>
  );
}
