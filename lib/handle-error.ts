import { isRedirectError } from "next/dist/client/components/redirect-error";
import { z } from "zod";

const UNKNOWN_ERROR_MESSAGE = "Something went wrong, please try again later.";

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    return err.issues
      .map((issue: z.ZodIssue) => issue.message)
      .join("\n");
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (isRedirectError(err)) {
    throw err;
  }

  return UNKNOWN_ERROR_MESSAGE;
}

export function logError(err: unknown, context?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("[rookie-crm]", { error: err, context });
  }
}