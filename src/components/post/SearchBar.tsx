"use client";
import { Input } from "@heroui/react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ onChange, value }: Props) => {
  return (
    <Input
      placeholder="Buscar publicaciones..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="primary"
      className="border-2 border-transparent focus-within:border-[#008296] w-full"
    />
  );
};
