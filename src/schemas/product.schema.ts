import { z } from "zod";
import { metaResponseSchema } from "./response.schema";

const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.coerce.date(),
  reviewerName: z.string(),
  reviewerEmail: z.email(),
});

const dimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

const metaSchema = z.object({
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  barcode: z.string(),
  qrCode: z.string(),
});

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string().optional(),
  sku: z.string(),
  weight: z.number(),
  dimensions: dimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(reviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: metaSchema,
  thumbnail: z.string(),
  images: z.array(z.string()),
});
export type Product = z.infer<typeof productSchema>;

export const productsResponseSchema = metaResponseSchema.extend({
  products: z.array(productSchema),
});
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
