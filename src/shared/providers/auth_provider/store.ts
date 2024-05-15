import { create } from "zustand";
import { User } from "../../typings";

interface State {
  user?: User;
}

type Action = {
  updateUser: (user: State["user"]) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: undefined,
  updateUser: (user: User | undefined) => set(() => ({ user })),
}));
