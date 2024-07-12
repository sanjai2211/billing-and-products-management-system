import * as z from "zod";

export const AddressSchema = z.object({
  addressLine1: z.string().min(3, { message: "Provide Atleast Three characters" }).optional(),
  addressLine2: z.string().min(3, { message: "Provide Atleast Three characters" }).optional(), 
  city: z.string().min(3, { message: "Provide Atleast Three characters" }).optional(),
  state: z.string().min(3, { message: "Provide Atleast Three characters" }).optional(),
  zip: z.string().min(6, { message: "Provide valid ZIP / Postal code" }).optional(),
});
