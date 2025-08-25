"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  loading?: boolean;
}

export default function ImageUpload({ onUpload, loading }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
    } catch (error) {
      alert("Error uploading image!");
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading || loading}
      />
      <label htmlFor="single">
        <Button disabled={uploading || loading} className="cursor-pointer">
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </label>
    </div>
  );
}
