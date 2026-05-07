"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ReactElement, useEffect, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchInput({ value, onChange, onClear }: SearchInputProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Autofocus on mount
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative flex items-center w-full">
      <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for articles, topics, or sources..."
        className="h-14 w-full pl-12 pr-12 text-base rounded-xl border-border bg-card shadow-sm"
      />
      {value.length > 0 && (
        <button
          onClick={() => {
            onClear();
            inputRef.current?.focus();
          }}
          className="absolute right-4 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-zinc-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
