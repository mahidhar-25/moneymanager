import { create } from "zustand";
import type {
    userManager,
    LendingUserAccount,
    Transaction,
    TransactionType,
} from "@/types/LendingManager";
import { useUserManagerStore } from "./userManager";

export type userManagerState = {
    lendingUsers: userManager[];
};

type userManagerAccountActions = {
    addLendingUserAccount: (
        userId: string,
        account: LendingUserAccount
    ) => void;
    getUserAccount: (
        userId: string,
        accountId: string
    ) => LendingUserAccount | undefined;
    updateLenderUserAccount: (
        userId: string,
        accountId: string,
        updatedAccount: LendingUserAccount
    ) => void;
    deleteLenderUserAccount: (userId: string, accountId: string) => void;
    getUserAccounts: (userId: string) => LendingUserAccount[] | undefined;
};

export const useAccountStore = create<
    userManagerState & userManagerAccountActions
>((set, get) => ({
    lendingUsers: useUserManagerStore.getState().lendingUsers,
    addLendingUserAccount: (userId, account) => {
        const newLendingUsers = useUserManagerStore
            .getState()
            .getLendingUser(userId);
        if (newLendingUsers !== undefined) {
            const updatedUser = {
                ...newLendingUsers,
                accounts:
                    newLendingUsers.accounts.length > 0
                        ? [...newLendingUsers.accounts, account]
                        : [account],
            };
            useUserManagerStore
                .getState()
                .updateLendingUser(userId, updatedUser);
        }
    },
    getUserAccount: (userId, accountId) => {
        const user = useUserManagerStore
            .getState()
            .lendingUsers.find((user) => user.id === userId);
        return user?.accounts.find((account) => account.id === accountId);
    },

    updateLenderUserAccount: (userId, accountId, updatedAccount) => {
        console.log(
            "userid : ",
            userId,
            "accountid : ",
            accountId,
            "updatedAccount : ",
            updatedAccount
        );
        const newLendingUsers = useUserManagerStore
            .getState()
            .lendingUsers.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          accounts: user.accounts.map((account) =>
                              account.id === accountId
                                  ? updatedAccount
                                  : account
                          ),
                      }
                    : user
            );

        useUserManagerStore.getState().setLendingUsers(newLendingUsers);
        set({ lendingUsers: newLendingUsers });
        console.log("account store updated: ", newLendingUsers);
    },

    deleteLenderUserAccount: (userId, accountId) => {
        const newLendingUsers = useUserManagerStore
            .getState()
            .lendingUsers.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          accounts: user.accounts.filter(
                              (account) => account.id !== accountId
                          ),
                      }
                    : user
            );

        useUserManagerStore.getState().setLendingUsers(newLendingUsers);
        set({ lendingUsers: newLendingUsers });
    },

    getUserAccounts: (userId) => {
        const user = useUserManagerStore
            .getState()
            .lendingUsers.find((user) => user.id === userId);
        return user?.accounts;
    },
}));
