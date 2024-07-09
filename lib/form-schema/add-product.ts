import * as z from "zod";

const ProductSchema = z.object({
  code: z.string().min(5, {
    message: "Code must be at least 5 characters.",
  }),
  productName: z.string().min(3, {
    message: "Product Name must be at least 3 characters.",
  }),
  printName: z.string().min(3, {
    message: "Print Name must be at least 3 characters.",
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
});

// const ProductSchema = z.object({
//   code: z.string().min(5, {
//     message: "Code must be at least 5 characters.",
//   }),
//   productName: z.string().min(3, {
//     message: "Product Name must be at least 3 characters.",
//   }),
//   printName: z.string().min(3, {
//     message: "Print Name must be at least 3 characters.",
//   }),
//   category: z.string().min(1, {
//     message: "Category is required.",
//   }),
//   unit: z.string().min(1, {
//     message: "Unit is required.",
//   }),
//   group: z.string().min(1, {
//     message: "Group is required.",
//   }),
//   brand: z.string().min(1, {
//     message: "Brand is required.",
//   }),
//   cost: z.string().min(1, {
//     message: "Cost is required.",
//   }),
//   mrp: z.string().min(1, {
//     message: "MRP is required.",
//   }),
//   purchaseRate: z.string().min(1, {
//     message: "Purchase Rate is required.",
//   }),
//   salesRate: z.string().min(1, {
//     message: "Sales Rate is required.",
//   }),
//   gstPurchase: z.string().min(1, {
//     message: "GST Purchase is required.",
//   }),
//   gstSales: z.string().min(1, {
//     message: "GST Sales is required.",
//   }),
//   igstPurchase: z.string().min(1, {
//     message: "IGST Purchase is required.",
//   }),
//   igstSales: z.string().min(1, {
//     message: "IGST Sales is required.",
//   }),
//   hsnCode: z.string().min(1, {
//     message: "HSN Code is required.",
//   }),
//   openStock: z.string().min(1, {
//     message: "Open Stock is required.",
//   }),
//   stockValue: z.string().min(1, {
//     message: "Stock Value is required.",
//   }),
//   status: z.string().optional(),

// });

export { ProductSchema };
