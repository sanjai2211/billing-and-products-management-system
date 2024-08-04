import * as z from "zod";

export const AddStockSchema = z.object({
  code: z.object({
    value: z.string(),
    label: z.string(),
  }),
  productName: z.object({
    value: z.string(),
    label: z.string(),
  }).optional(),
  printName: z.object({
    value: z.string(),
    label: z.string(),
  }),
  category: z.string().optional(),
  unit: z.string().optional(),
  group: z.string().optional(),
  brand: z.string().optional(),
  cost: z.string().optional(),
  mrp: z.string().optional(),
  purchaseRate: z.string().optional(),
  salesRate: z.string().optional(),
  gstPurchase: z.string().optional(),
  gstSales: z.string().optional(),
  igstPurchase: z.string().optional(),
  igstSales: z.string().optional(),
  hsnCode: z.string().optional(),
  openStock: z.string().optional(),
  stockValue: z.string().optional(),
  status: z.string().optional(),
  quantity: z.string().optional(),
  newQuantity: z.string().optional(),
  edit: z.boolean().optional(),
  delete: z.boolean().optional(),
});

export const StockDetailsSchema =  z.object({
  customerName: z.object({
    value: z.string(),
    label: z.string(),
  }),
  bankName: z.object({
    value: z.string(),
    label: z.string(),
  }).optional(),

})
