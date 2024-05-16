import { create } from "zustand";
import { Product } from "../../shared";

interface State {
  products: Product[];
}

type Actions = {
  toggleProduct: (product: Product) => void;
  removeProduct: (id: Product["id"]) => void;
};

export const useBasketStore = create<State & Actions>((set) => ({
  products: [],

  toggleProduct: (product) =>
    set((state) => {
      const isProductInBasket = state.products.some((p) => p.id === product.id);
      if (isProductInBasket) {
        return {
          products: state.products.filter((p) => p.id !== product.id),
        };
      } else {
        return {
          products: [...state.products, product],
        };
      }
    }),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
