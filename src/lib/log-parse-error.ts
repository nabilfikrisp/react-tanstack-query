import { z, type ZodError } from "zod";

export function logParseError(error: ZodError) {
  console.warn("Data mismatch:", z.prettifyError(error));
}
