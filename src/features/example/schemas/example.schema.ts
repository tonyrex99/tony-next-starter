import { z } from "zod";

export const itemFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  category: z.string().min(2, "Category is required"),
  amount: z.coerce.number().min(0, "Amount must be a positive number"),
  status: z.enum(["active", "inactive", "archived"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
  description: z.string().max(500).optional(),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;
