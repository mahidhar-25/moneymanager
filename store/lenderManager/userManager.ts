import { create } from "zustand";
import type {
    userManager,
    LendingUserAccount,
    Transaction,
    TransactionType,
} from "@/types/LendingManager";

export type userManagerState = {
    lendingUsers: userManager[];
};

type userManagerActions = {
    setLendingUsers: (users: userManager[]) => void;
    addLenderUser: (newUserManager: userManager) => void;
    updateLendingUser: (
        userId: string,
        updatedUserManager: userManager
    ) => void;
    deleteLendingUser: (userId: string) => void;
    getLendingUser: (userId: string) => userManager | undefined;
    getLendingUserNames: () => { name: string; id: string }[];
    getAllAccounts: () => LendingUserAccount[];
};

export const useUserManagerStore = create<
    userManagerState & userManagerActions
>((set, get) => ({
    lendingUsers: [],
    setLendingUsers: (users: userManager[]) => {
        console.log("user manager before : ", get().lendingUsers);
        // Avoid setting the same state repeatedly
        if (users !== get().lendingUsers) {
            set({ lendingUsers: users });
            console.log("after manager store : ", get().lendingUsers);
        }
    },
    addLenderUser: (newUserManager) =>
        set((state) => ({
            lendingUsers: [...state.lendingUsers, newUserManager],
        })),
    updateLendingUser: (userId, updatedUserManager) =>
        set((state) => ({
            lendingUsers: state.lendingUsers.map((user) =>
                user.id === userId ? updatedUserManager : user
            ),
        })),
    deleteLendingUser: (userId) =>
        set((state) => ({
            lendingUsers: state.lendingUsers.filter(
                (user) => user.id !== userId
            ),
        })),
    getLendingUser: (userId) =>
        get().lendingUsers.find((user) => user.id === userId),
    getLendingUserNames: () =>
        get().lendingUsers.map((user) => ({
            name: user.name,
            id: user.id,
        })),

    getAllAccounts: () => {
        return get().lendingUsers.flatMap((user) => user.accounts);
    },
}));
