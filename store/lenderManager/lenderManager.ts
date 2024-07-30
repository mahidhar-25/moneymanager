import { create } from "zustand";

export enum TransactionType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
}

type Transaction = {
    id: string;
    username?: string;
    accountId: string;
    principal: number;
    interest: number;
    transactionType: TransactionType;
    amount: number;
    startDate?: Date;
    paidDate?: Date;
};

export type LendingUserAccount = {
    id: string;
    principal: number;
    interestRate: number;
    startDate: Date;
    endDate?: Date | undefined | null;
    createdAt?: Date;
    updatedAt?: Date;
    username?: string;
    compounded: boolean;
    forNoOfYears: number;
    userId: string;
    transactions: Transaction[];
};

export type userManager = {
    id: string;
    name: string;
    phoneNo: string;
    state: string;
    city: string;
    pincode: string;
    address: string;
    accounts: LendingUserAccount[];
};

export type userManagerState = {
    lendingUsers: userManager[];
};

type userManagerActions = {
    updateUserManager: (updatedUserManager: userManager[]) => void;
    updateLendingUser: (
        userId: string,
        updatedUserManager: userManager
    ) => void;
    getLendingUser: (userId: string) => userManager | undefined;
    deleteLendingUser: (userId: string) => void;
    getUserAccount: (
        userId: string,
        accountId: string
    ) => LendingUserAccount | undefined;
    getUserTransactions: (
        userId: string,
        accountId: string
    ) => Transaction[] | undefined;
    getUserAccounts: (userId: string) => LendingUserAccount[] | undefined;
    getSpecificTransaction: (
        userId: string,
        accountId: string,
        transactionId: string
    ) => Transaction | undefined;
    addLenderUser: (newUserManager: userManager) => void;
    updateLenderUserAccount: (
        userId: string,
        accountId: string,
        updatedAccount: LendingUserAccount
    ) => void;
    deleteLenderUserAccount: (userId: string, accountId: string) => void;
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
};

const useUserManagerStore = create<userManagerState & userManagerActions>(
    (set, get) => ({
        lendingUsers: [],
        updateUserManager: (updatedUserManager) =>
            set((state) => ({
                lendingUsers: updatedUserManager,
            })),
        updateLendingUser: (userId, updatedUserManager) =>
            set((state) => ({
                lendingUsers: state.lendingUsers.map((user) =>
                    user.id === userId ? updatedUserManager : user
                ),
            })),
        getLendingUser: (userId) =>
            get().lendingUsers.find((user) => user.id === userId),
        deleteLendingUser: (userId) =>
            set((state) => ({
                lendingUsers: state.lendingUsers.filter(
                    (user) => user.id !== userId
                ),
            })),
        getUserAccount: (userId, accountId) => {
            const user = get().getLendingUser(userId);
            return user?.accounts.find((account) => account.id === accountId);
        },
        getUserTransactions: (userId, accountId) => {
            const account = get().getUserAccount(userId, accountId);
            return account?.transactions;
        },
        getUserAccounts: (userId) => {
            const user = get().getLendingUser(userId);
            return user?.accounts;
        },
        getSpecificTransaction: (userId, accountId, transactionId) => {
            const transactions = get().getUserTransactions(userId, accountId);
            return transactions?.find(
                (transaction) => transaction.id === transactionId
            );
        },
        addLenderUser: (newUserManager) =>
            set((state) => ({
                lendingUsers: [...state.lendingUsers, newUserManager],
            })),
        updateLenderUserAccount: (userId, accountId, updatedAccount) =>
            set((state) => ({
                lendingUsers: state.lendingUsers.map((user) =>
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
                ),
            })),
        deleteLenderUserAccount: (userId, accountId) =>
            set((state) => ({
                lendingUsers: state.lendingUsers.map((user) =>
                    user.id === userId
                        ? {
                              ...user,
                              accounts: user.accounts.filter(
                                  (account) => account.id !== accountId
                              ),
                          }
                        : user
                ),
            })),
        addLenderUserTransaction: (userId, accountId, transaction) =>
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
            })),
        deleteLenderUserTransaction: (userId, accountId, transactionId) =>
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
            })),
    })
);

export default useUserManagerStore;
