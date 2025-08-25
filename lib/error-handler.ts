import type { PostgrestError } from "@supabase/supabase-js";

export function handleSupabaseError(
  error: PostgrestError | null | undefined
): string {
  if (!error) return "An unexpected error occurred";

  console.error("Supabase error:", error);

  if (error.code === "PGRST301") {
    return "Access denied. Please check your permissions.";
  }

  if (error.code === "23505") {
    return "This record already exists.";
  }

  return error.message || "An unexpected error occurred";
}
