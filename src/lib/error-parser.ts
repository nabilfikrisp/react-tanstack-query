import { z, ZodError } from "zod";

export function errorParser(error: unknown): string {
  if (error instanceof ZodError) {
    console.warn("Validation errors:", z.prettifyError(error));
    return "The server returned unexpected data.";
  }
  if (error instanceof Error) {
    console.warn("Client error:", error.message);
    return error.message;
  }

  console.warn("Unknown error:", error);
  return "An unknown error occurred.";
}
