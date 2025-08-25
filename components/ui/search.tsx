"use client";

import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  className?: string;
}

export function Search({ onSearch, className, ...props }: SearchProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex items-center w-full max-w-md", className)}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-10 pl-10 pr-4 rounded-full border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-coral-red"
        {...props}
      />
      <SearchIcon className="absolute left-3 w-4 h-4 text-charcoal/50" />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute right-3 text-charcoal/50 hover:text-charcoal"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
