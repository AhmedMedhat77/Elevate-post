import { Search } from "lucide-react";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks";
import { Input } from "./Input";

interface SearchInputProps extends React.ComponentProps<"input"> {
  debounceTime?: number;
  onSearch?: (value: string) => void;
  iconColor?: string;
  iconSize?: number;
}

const SearchInput = ({
  debounceTime = 300,
  onSearch,
  iconColor,
  iconSize = 20,
  ...props
}: SearchInputProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, debounceTime);

  useEffect(() => {
    onSearch?.(debouncedSearch);
  }, [debouncedSearch, onSearch]);
  return (
    <div className="w-full relative">
      <Search
        className="absolute left-2 top-1/2 -translate-y-1/2"
        size={iconSize}
        color={iconColor || "black"}
      />
      <Input
        className={` ${props.className} px-8`}
        {...props}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
