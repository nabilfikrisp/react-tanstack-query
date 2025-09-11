import { z } from "zod";
import { brandSchema } from "./brand.schema";
import { metaResponseSchema } from "./response.schema";

const productDetailsSchema = z.object({
  description: z.string(),
  stock: z.number().int().nonnegative(),
  weight: z.string(), // e.g., "495g"
  dimensions: z.string(), // e.g., "12x9x8 cm"
  warranty: z.string(), // e.g., "14 months"
});

export const productSchema = z.object({
  id: z.number().int().positive(),
  brandId: z.number().int().positive(),
  name: z.string(),
  price: z.number().nonnegative(),
  discountedPrice: z.number().nonnegative().optional(),
  onSale: z.boolean(),
  category: z.string(),
  rating: z.number().min(0).max(5),
  image: z.url(),
  createdAt: z.string(),
  details: productDetailsSchema,
});

export const productWithBrandSchema = productSchema.extend({
  brand: brandSchema,
});

export const productsResponseSchema = metaResponseSchema.extend({
  products: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
export type ProductWithBrand = z.infer<typeof productWithBrandSchema>;
