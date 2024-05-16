import { create } from "zustand";

interface State {
  categoryId?: number;
}

type Action = {
  setCategory: (id: State["categoryId"]) => void;
};

export const useCategoryStore = create<State & Action>((set) => ({
  categoryId: undefined,
  setCategory: (categoryId: number | undefined) => set(() => ({ categoryId })),
}));
