import { Box, Popover } from "@mui/material";
import { FC } from "react";
import { SearchItem } from "../search-item";
import { Product } from "../../../../shared";

interface ISearchList {
  open: boolean;
  data: Product[];
  onClose: (arg: boolean) => void;
  anchorEl: HTMLElement | null;
  isLoading: boolean;
  setProduct?: (arg: Product) => void;
  setOpen: (arg: boolean) => void;
}
export const SearchList: FC<ISearchList> = ({
  open,
  anchorEl,
  onClose,
  isLoading,
  setProduct,
  setOpen,
  data,
}) => {
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      container={anchorEl}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {isLoading ? (
        <></>
      ) : (
        data &&
        data.map((product) => (
          <Box
            key={product.id}
            onClick={() => {
              setProduct && setProduct(product);
              setOpen(false);
            }}
          >
            <SearchItem setProduct={setProduct} product={product} />
          </Box>
        ))
      )}
    </Popover>
  );
};
