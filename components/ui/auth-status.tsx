import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AuthStatus() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return (
      <Link href="/login" className="underline">
        Sign in
      </Link>
    );
  }
  return <span className="opacity-80">Hello, {user.email}</span>;
}
