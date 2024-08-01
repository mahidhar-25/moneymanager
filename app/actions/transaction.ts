"use server";

import client from "@/db/index";
import { updateLendingUserAccountAction } from "./lenderUserAccount";
import { AccountStatus, TransactionType } from "@prisma/client";
import { calculateCompoundInterest } from "../helpers/interest";
import { Account, LendingUserAccount } from "@/types/LendingManager";

interface Transaction {
    username?: string;
    accountId: string;
    transactionType: TransactionType;
    amount: number;
    transactionDate: Date;
}
function errLog(error: any) {
    let msg = "error";
    if (error instanceof Error) {
        console.error("An error occurred:", error.message);
        msg = error.message;
    } else {
        console.error("An unknown error occurred:", error);
    }
    return {
        status: 400,
        data: msg,
    };
}
export async function createTransactionAction(transaction: Transaction) {
    try {
        const username = transaction?.username || "mahidhar100008@gmail.com";
        const paymentTransaction = await client.paymentTransaction.create({
            data: {
                ...transaction,
                username,
            },
        });

        // Update the account status and end date
        const account = await client.lendUserAccount.update({
            where: {
                id: transaction.accountId,
            },
            data: {
                accountStatus: AccountStatus.CLOSE,
                endDate: transaction.transactionDate,
            },
        });

        const data = calculateCompoundInterest({
            ...account,
            endDate: transaction.transactionDate,
        });

        const finalAmount =
            data.principal +
            data.interest +
            (transaction.transactionType === TransactionType.CREDIT
                ? transaction.amount
                : -transaction.amount);

        if (finalAmount > 0) {
            const createAccount: Omit<
                LendingUserAccount,
                "id" | "transactions"
            > = {
                userId: account.userId,
                principal: finalAmount,
                interestRate: account.interestRate,
                startDate: transaction.transactionDate,
                endDate: null,
                username: account.username,
                compounded: account.compounded,
                forNoOfYears: account.forNoOfYears,
                accountStatus: AccountStatus.OPEN,
            };

            const user = await client.lendUserAccount.create({
                data: {
                    ...createAccount,
                    username: account.username,
                },
            });
        }
        return {
            status: 200,
            date: {
                paymentTransaction,
            },
        };
    } catch (error) {
        return errLog(error);
    }
}

export async function getAllTransactionsOfAccount(accountId: string) {
    try {
        const transactions = await client.paymentTransaction.findMany({
            where: {
                accountId: accountId,
            },
        });

        return {
            status: 200,
            data: transactions,
        };
    } catch (error) {
        return errLog(error);
    }
}
