"use client";
import { Box, FormGroup, Input } from "@mui/material";
import { ChangeEvent, FC, useRef, useState } from "react";
import { SearchList } from "./lib/search-list";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../shared";
import { useDebounce } from "../../shared/hooks/view";
import { searchMutation } from "./model";

export const Search: FC<{ setProduct?: (arg: Product) => void }> = ({
  setProduct,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 250);
  const anchorElRef = useRef<HTMLElement | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["search-anime", searchTerm],
    queryFn: async () => await searchMutation(searchTerm),
    enabled: !!debouncedSearch,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setOpen(searchTerm.length > 1);
  };

  return (
    <Box>
      <FormGroup
        ref={anchorElRef}
        onClick={() => searchTerm.length !== 0 && setOpen(true)}
      >
        <Input
          onChange={handleSearch}
          value={searchTerm}
          placeholder="Поиск аниме"
        />
      </FormGroup>
      {data && (
        <SearchList
          data={data}
          setOpen={setOpen}
          setProduct={(arg: Product) => setProduct && setProduct(arg)}
          onClose={() => setOpen(false)}
          open={open}
          anchorEl={anchorElRef.current}
          isLoading={isLoading}
        />
      )}
    </Box>
  );
};
