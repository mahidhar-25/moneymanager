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

type userTransactionActions = {
    getUserTransactions: (
        userId: string,
        accountId: string
    ) => Transaction[] | undefined;
    getSpecificTransaction: (
        userId: string,
        accountId: string,
        transactionId: string
    ) => Transaction | undefined;
    addLenderUserTransaction: (
        userId: string,
        accountId: string,
        transaction: Transaction
    ) => void;
    deleteLenderUserTransaction: (
        userId: string,
        accountId: string,
        transactionId: string
    ) => void;
    getAllTransactionByAccountId: (accountId: string) => Transaction[];
};

export const useTransactionStore = create<
    userManagerState & userTransactionActions
>((set, get) => ({
    lendingUsers: useUserManagerStore.getState().lendingUsers,
    getUserTransactions: (userId, accountId) => {
        const user = useUserManagerStore
            .getState()
            .lendingUsers.find((user) => user.id === userId);
        const account = user?.accounts.find(
            (account) => account.id === accountId
        );
        return account?.transactions;
    },
    getSpecificTransaction: (userId, accountId, transactionId) => {
        const transactions = get().getUserTransactions(userId, accountId);
        return transactions?.find(
            (transaction) => transaction.id === transactionId
        );
    },
    addLenderUserTransaction: (userId, accountId, transaction) => {
        set((state) => ({
            lendingUsers: state.lendingUsers.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          accounts: user.accounts.map((account) =>
                              account.id === accountId
                                  ? {
                                        ...account,
                                        transactions: [
                                            ...account.transactions,
                                            transaction,
                                        ],
                                    }
                                  : account
                          ),
                      }
                    : user
            ),
        }));
        useUserManagerStore.getState().setLendingUsers(get().lendingUsers);
    },
    deleteLenderUserTransaction: (userId, accountId, transactionId) => {
        set((state) => ({
            lendingUsers: state.lendingUsers.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          accounts: user.accounts.map((account) =>
                              account.id === accountId
                                  ? {
                                        ...account,
                                        transactions:
                                            account.transactions.filter(
                                                (transaction) =>
                                                    transaction.id !==
                                                    transactionId
                                            ),
                                    }
                                  : account
                          ),
                      }
                    : user
            ),
        }));
        useUserManagerStore.getState().setLendingUsers(get().lendingUsers);
    },

    getAllTransactions: () => {
        return useUserManagerStore
            .getState()
            .getAllAccounts()
            .flatMap((account) => account.transactions);
    },

    getAllTransactionByAccountId: (accountId: string) => {
        const transactions = useUserManagerStore
            .getState()
            .getAllAccounts()
            .flatMap((account) => account.transactions)
            .filter((transaction) => {
                return transaction.accountId === accountId;
            });
        return transactions;
    },
}));
