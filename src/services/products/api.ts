import api from "@/configs/axios";
import { productsResponseSchema } from "@/schemas/product.schema";

export async function fetchProducts() {
  const response = await api.get(`/products`);
  return productsResponseSchema.parse(response.data);
}
