export type Status = "loading" | "empty" | "content" | "error";

export function problemFor(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}
