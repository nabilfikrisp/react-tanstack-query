import { z, ZodError } from "zod";

type ErrorParserOptions = {
  log: boolean;
};
export function errorParser(
  error: unknown,
  options: ErrorParserOptions = { log: false },
): string {
  if (error instanceof ZodError) {
    if (options.log) {
      console.warn("Validation errors:", z.prettifyError(error));
    }
    return "The server returned unexpected data.";
  }
  if (error instanceof Error) {
    if (options.log) {
      console.warn("Client error:", error.message);
    }
    return error.message;
  }

  if (options.log) {
    console.warn("Unknown error:", error);
  }
  return "An unknown error occurred.";
}
