import * as z from 'zod';
import { AddressSchema } from './address-details';

export const BillingItemsSchema = z.object({
  code: z.string().min(1, { message: 'Code is required' }),
  printName: z.string().min(1, { message: 'Print Name is required' }),
  hsnCode: z.string().min(1, { message: 'HSN Code is required' }),
  gst: z.string().min(1, { message: 'GST is required' }),
  quantity: z.string().min(1, { message: 'Quantity is required' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  cost: z.string().min(1,{ message: 'Rate must be a positive number' }),
  discount: z.string().min(1,{ message: 'Discount must be zero or a positive number' }).optional(),
  total: z.string().min(1,{ message: 'Discount must be zero or a positive number' }).optional(),
});

export const CustomerDetailsSchema = z.object({
  name: z.string().min(1, { message: 'Customer name is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  faxNumber: z.string().optional(),
  customerAddress: AddressSchema,
  gstIn: z.string().min(1, { message: 'GSTIN is required' }),
});

export const TransportDetailsSchema = z.object({
  referenceNumber: z.string().min(1, { message: 'Reference number is required' }),
  transport: z.string().min(1, { message: 'Transport is required' }),
  transportDetails: z.string().optional(),
  ewayBill: z.string().optional(),
  lorryReceiptNumber: z.string().optional(),
  postOrderNumber: z.string().optional(),
  postOrderDate: z.date().optional(),
});

export const BankDetailsSchema = z.object({
  bankName: z.string().min(1, { message: 'Bank name is required' }),
  accountNumber: z.string().min(1, { message: 'Account number is required' }),
  branchName: z.string().optional(),
  ifscCode: z.string().min(1, { message: 'IFSC code is required' }),
});

export const BillSchema = z.object({
  id: z.string().min(1, { message: 'Bill ID is required' }),
  code: z.string().min(1, { message: 'Code is required' }),
  items: z.array(BillingItemsSchema).min(1, { message: 'At least one item is required' }),
  type: z.enum(['BILL', 'QUOTATION', 'TAX_INVOICE'], { errorMap: () => ({ message: 'Invalid bill type' }) }),
  customer: CustomerDetailsSchema,
  transport: TransportDetailsSchema.optional(),
  date: z.date({ errorMap: () => ({ message: 'Invalid date' }) }),
  dueDate: z.date({ errorMap: () => ({ message: 'Invalid due date' }) }).optional(),
  paymentTerms: z.enum(['CREDIT', 'CASH'], { errorMap: () => ({ message: 'Invalid payment terms' }) }),
  gst: z.string().min(1, { message: 'GST is required' }),
  cgst: z.string().min(1, { message: 'CGST is required' }),
  sgst: z.string().min(1, { message: 'SGST is required' }),
  gstOnReverseCharge: z.string().optional(),
  discountedAmount: z.string().optional(),
  createdAt: z.date({ errorMap: () => ({ message: 'Invalid creation date' }) }).default(() => new Date()),
  updatedAt: z.date({ errorMap: () => ({ message: 'Invalid update date' }) }).default(() => new Date()),
  reverseCharge: z.boolean(),
  bankDetails: BankDetailsSchema.optional(),
});
