import api from "@/configs/axios";
import { logParseError } from "@/lib/log-parse-error";
import { productsResponseSchema } from "@/schemas/product.schema";

export async function fetchProducts() {
  const response = await api.get(`/products`);

  const parsed = productsResponseSchema.safeParse(response.data);
  if (!parsed.success) {
    logParseError(parsed.error);
  }

  return parsed.data;
}
