"use server";

import client from "@/db/index";
import { z } from "zod";
import { updateLendingUserAccountAction } from "./lenderUserAccount";

/*
model paymentTransaction {
  id              String          @id @default(cuid())
  username        String
  user            User            @relation(fields: [username], references: [username])
  accountId       String
  account         LendUserAccount @relation(fields: [accountId], references: [id])
  principal       Float
  interest        Float
  transactionType TransactionType
  amount          Float
  startDate       DateTime
  paidDate        DateTime        @default(now())
}
*/

enum TransactionType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
}
interface Transaction {
    username?: string;
    accountId: string;
    principal: number;
    interest: number;
    transactionType: TransactionType;
    amount: number;
    startDate?: Date;
    paidDate?: Date;
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
        message: msg,
    };
}
export async function createTransactionAction(transaction: Transaction) {
    try {
        const username = transaction?.username || "mahidhar100008@gmail.com";

        if (!transaction?.startDate) {
            const account = await client.lendUserAccount.findUnique({
                where: {
                    id: transaction.accountId,
                },
            });

            if (!account) {
                return {
                    status: 404,
                    message: "Account not found",
                };
            }

            transaction.startDate = account.startDate;
        }

        const paymentTransaction = await client.paymentTransaction.create({
            data: {
                ...transaction,
                startDate: transaction.startDate,
                username,
            },
        });

        const oldPayableAmount =
            paymentTransaction.principal + paymentTransaction.interest;
        let newPayablePayment = oldPayableAmount;
        if (paymentTransaction.transactionType === TransactionType.CREDIT) {
            newPayablePayment += paymentTransaction.amount;
        } else {
            newPayablePayment -= paymentTransaction.amount;
        }
        const updateAccount = await updateLendingUserAccountAction({
            id: paymentTransaction.accountId,
            principal: newPayablePayment,
            startDate: paymentTransaction.paidDate,
        });

        return {
            status: 200,
            date: {
                paymentTransaction,
                updateAccount,
            },
        };
    } catch (error) {
        return errLog(error);
    }
}
