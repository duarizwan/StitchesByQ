// types/supabase.ts
export interface UserMetadata {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  user_metadata?: UserMetadata;
  app_metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string;
  role?: string;
  aud?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: User;
}

// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          email: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number | null;
          category: string | null;
          image_url: string | null;
          features: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price?: number | null;
          category?: string | null;
          image_url?: string | null;
          features?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number | null;
          category?: string | null;
          image_url?: string | null;
          features?: Json | null;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          first_name: string;
          last_name: string;
          contact_number: string;
          alternate_contact: string | null;
          email: string;
          address: string | null;
          dress_type: string;
          measurement_type: string;
          shoulder: string | null;
          sleeve_length: string | null;
          chest_width: string | null;
          neck_measurement: string | null;
          waist_measurement: string | null;
          hip_measurement: string | null;
          bottom_length: string | null;
          sample: string | null;
          delivery: string | null;
          delivery_date_time: string | null;
          status: string;
          total_amount: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          first_name: string;
          last_name: string;
          contact_number: string;
          alternate_contact?: string | null;
          email: string;
          address?: string | null;
          dress_type: string;
          measurement_type: string;
          shoulder?: string | null;
          sleeve_length?: string | null;
          chest_width?: string | null;
          neck_measurement?: string | null;
          waist_measurement?: string | null;
          hip_measurement?: string | null;
          bottom_length?: string | null;
          sample?: string | null;
          delivery?: string | null;
          delivery_date_time?: string | null;
          status?: string;
          total_amount?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          first_name?: string;
          last_name?: string;
          contact_number?: string;
          alternate_contact?: string | null;
          email?: string;
          address?: string | null;
          dress_type?: string;
          measurement_type?: string;
          shoulder?: string | null;
          sleeve_length?: string | null;
          chest_width?: string | null;
          neck_measurement?: string | null;
          waist_measurement?: string | null;
          hip_measurement?: string | null;
          bottom_length?: string | null;
          sample?: string | null;
          delivery?: string | null;
          delivery_date_time?: string | null;
          status?: string;
          total_amount?: number | null;
          updated_at?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          status?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      order_status:
        | "pending"
        | "confirmed"
        | "in-progress"
        | "completed"
        | "cancelled";
      contact_status: "unread" | "read" | "replied";
      measurement_type: "top" | "bottom" | "both";
    };
  };
}

// Re-export utility types
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Specific type exports for easier use
export type Order = Tables<"orders">;
export type OrderInsert = TablesInsert<"orders">;
export type OrderUpdate = TablesUpdate<"orders">;
export type Product = Tables<"products">;
export type ProductInsert = TablesInsert<"products">;
export type ProductUpdate = TablesUpdate<"products">;
export type Contact = Tables<"contacts">;
export type ContactInsert = TablesInsert<"contacts">;

export type OrderStatus = Enums<"order_status">;
export type ContactStatus = Enums<"contact_status">;
export type MeasurementType = Enums<"measurement_type">;

// Rest of your existing interfaces...
export interface AuthResponse {
  data: {
    user: User | null;
    session: Session | null;
  };
  error: AuthError | null;
}

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

export interface OrderFormData {
  id?: string;
  user_id?: string | null;
  first_name: string;
  last_name: string;
  contact_number: string;
  alternate_contact?: string | null;
  email: string;
  address?: string | null;
  dress_type: string;
  measurement_type: string;
  shoulder?: string | null;
  sleeve_length?: string | null;
  chest_width?: string | null;
  neck_measurement?: string | null;
  waist_measurement?: string | null;
  hip_measurement?: string | null;
  bottom_length?: string | null;
  sample?: string | null;
  delivery?: string | null;
  delivery_date_time?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export interface MeasurementDisplay {
  top: boolean;
  bottom: boolean;
}

export type ProductCategory =
  | "traditional"
  | "bridal"
  | "formal"
  | "party"
  | "casual"
  | "modest"
  | "kids"
  | "accessories";

export const DRESS_TYPES = [
  "Simple Suit",
  "Formal Suit",
  "Suit with Dori Piping",
  "Lining Suit",
  "Lining with Dori Piping",
  "Party Wear",
  "Bridal Dress",
  "Saree",
  "Lehenga",
  "Salwar Kameez",
  "Kurta",
  "Simple Abaya",
  "Fancy Abaya",
  "Kids' Clothing",
  "Gowns",
  "Jumpsuit",
  "Shirt",
  "Trouser",
  "Shrugs",
  "Tote Bags",
  "Others",
] as const;

export type DressType = (typeof DRESS_TYPES)[number];
