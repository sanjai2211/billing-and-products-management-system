// import * as z from "zod";
// import { AddressSchema } from "./address-details";

// export const ShopDetailsSchema = z
//   .object({
//     name: z
//       .string()
//       .min(3, { message: "Shop name must be at least 3 characters" }),
//     address: AddressSchema.optional(),
//     contactNumber: z
//       .string()
//       .min(10, { message: "Phone number must be at least 10 characters" })
//       .optional(),
//     contactPersonPhone: z
//       .string()
//       .min(3, { message: "Contact Name must be at least 3 characters" })
//       .refine((data : any) => data.contactNumber !== undefined, {
//         message: "Contact person phone is required when contact number is provided",
//         path: ['contactPersonPhone'], // Specify the path to the field
//       }),
//     contactPersonEmail: z
//       .string()
//       .min(3, { message: "Contact Name must be at least 3 characters" }),
//     contactEmail: z.string().email({ message: "Provide valid Email" }),
//   })
//   .refine(
//     (data) => {
//       if (data.contactNumber && !data.contactPersonPhone) {
//         return false;
//       }
      
//       return true;
//     },
//     {
//       message: "Ensure contact details are filled correctly",
//     }
//   );

import * as z from "zod";
import { AddressSchema } from "./address-details";

// Schema for a single contact detail
const ContactDetailSchema = z.object({
  contactPersonPhone: z
    .string()
    .min(3, { message: "Contact Name must be at least 3 characters" }),
  contactNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
});

// export const ShopDetailsSchema = z.object({
//   name: z.string().min(3, { message: "Shop name must be at least 3 characters" }),
//   address: AddressSchema.optional(),
//   phoneNumbers: z.array(ContactDetailSchema).refine((details) => {
//     return details.some((detail) => detail.contactNumber);
//   }, {
//     message: "At least one phone number is required",
//   }),
//   contactPersonEmail: z
//     .string()
//     .min(3, { message: "Contact Name must be at least 3 characters" }),
//   email: z.string().email({ message: "Provide valid Email" }),
// });


// Schema for shop details
export const ShopDetailsSchema = z.object({
  name: z.string().min(3, { message: "Shop name must be at least 3 characters" }),
  addressLine1: z.string().min(3, { message: "Provide Atleast Three characters" }).optional(),
  addressLine2: z.string().min(3, { message: "Provide Atleast Three characters" }).optional(), 
  city: z.string().min(3, { message: "Provide Atleast Three characters" }).optional(),
  state: z.string().min(3, { message: "Provide Atleast Three characters" }).optional(),
  zip: z.string().min(6, { message: "Provide valid ZIP / Postal code" }).optional(),
  phoneNumbers: z.string()
  .min(10, { message: "Phone number must be at least 10 characters" }),
  email: z.string().email({ message: "Provide valid Email" }).optional(),
});
