import * as z from "zod";

const StateSchema = z.object({
  value: z.number(),
  label: z.string(),
});

const CustomerSchema = z.object({
  customerName: z.string().min(3, {
    message: "Customer Name must be at least 3 characters.",
  }),
  printName: z.string().min(3, {
    message: "Print Name must be at least 3 characters.",
  }),
  gstIn: z.string().optional(),
  customerType: z.string().min(1),
  phoneNumbers: z.string().optional(),
  email: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: StateSchema.optional(),
  zip: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  branchName: z.string().optional(),
  ifscCode: z.string().optional(),
});

export { CustomerSchema };
