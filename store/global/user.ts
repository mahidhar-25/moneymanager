import { create } from "zustand";

export type User = {
    id: string;
    username: string;
};

type userValue = {
    user: User;
};

type userActions = {
    updateUser: (user: User) => void;
};

export const userUserStore = create<userValue & userActions>((set) => ({
    user: {} as User,
    updateUser: (user: User) => set({ user }),
}));
