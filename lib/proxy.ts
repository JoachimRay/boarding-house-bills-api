import { z } from "zod";

const authorizationSchema = z.string().startsWith("Bearer ");

export function validateAuthorizationHeader(value: string | null): string | null {
  const result = authorizationSchema.safeParse(value);
  return result.success ? result.data.slice("Bearer ".length).trim() : null;
}
