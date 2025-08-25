import { createClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export type SupabaseClient = ReturnType<typeof createClient>;
export type SupabaseServerClient = ReturnType<typeof createServerClient>;

export function handleSupabaseError(error: any): string {
  if (error?.message) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}

export async function getCurrentUser() {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return null;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const supabase = await createServerClient();
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
    
    return profile;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
}

export async function createUserProfile(userId: string, profileData: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}) {
  try {
    const supabase = await createServerClient();
    const { data: profile, error } = await supabase
      .from('profiles')
      .insert([{ id: userId, ...profileData }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
    
    return profile;
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    return null;
  }
}
