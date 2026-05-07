"use client";

import { Search, X } from "lucide-react";
import { ReactElement, useEffect, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchInput({ value, onChange, onClear }: SearchInputProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative flex items-center w-full group">
      <div className="absolute left-4 h-5 w-5 text-[#66a3ff] group-focus-within:text-[#007acc] transition-colors pointer-events-none">
        <Search className="h-5 w-5" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles, topics, companies..."
        className="h-14 w-full pl-12 pr-12 text-base rounded-2xl border border-[#c8ddf5] bg-white shadow-md shadow-blue-900/6 text-[#0a1628] placeholder:text-[#4a6890]/60 focus:outline-none focus:border-[#007acc] focus:ring-3 focus:ring-[#007acc]/20 transition-all"
      />
      {value.length > 0 && (
        <button
          onClick={() => {
            onClear();
            inputRef.current?.focus();
          }}
          className="absolute right-4 p-1.5 text-[#4a6890] hover:text-[#003366] rounded-full hover:bg-[#e8f2ff] transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
