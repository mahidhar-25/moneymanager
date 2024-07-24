"use server";

import client from "@/db/index";
import { z } from "zod";

interface LendingUserAccount {
    principal: number;
    interestRate: number;
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    username?: string;
    compounded: boolean;
    forNoOfYears: number;
    userId: string;
}

type updateUserAccount = {
    id: string;
    principal: number;
    startDate: Date;
};

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

export async function createLendingUserAccountAction(
    userAccount: LendingUserAccount
) {
    try {
        const username = userAccount?.username || "mahidhar100008@gmail.com";

        // Create the new lending user
        const user = await client.lendUserAccount.create({
            data: {
                ...userAccount,
                username,
            },
        });
        return {
            status: 200,
            data: user,
        };
    } catch (error) {
        return errLog(error);
    }
}

export async function getLendingUserAccountAction(id: string) {
    try {
        const lendingUserAccount = await client.lendUserAccount.findUnique({
            where: {
                id,
            },
        });

        if (!lendingUserAccount) {
            return {
                status: 404,
                message: "User not found",
            };
        }

        return {
            status: 200,
            data: lendingUserAccount,
        };
    } catch (error) {
        return errLog(error);
    }
}

export async function getAllLendingUserAccountAction(id: string) {
    try {
        const lendingUserAccounts = await client.lendUserAccount.findMany({
            where: {
                userId: id,
            },
        });

        if (!lendingUserAccounts) {
            return {
                status: 404,
                message: "User not found",
            };
        }

        return {
            status: 200,
            data: lendingUserAccounts,
        };
    } catch (error) {
        return errLog(error);
    }
}

export async function updateLendingUserAccountAction(
    updateAccount: updateUserAccount
) {
    try {
        const account = await client.lendUserAccount.update({
            where: {
                id: updateAccount.id,
            },
            data: {
                principal: updateAccount.principal,
                startDate: updateAccount.startDate,
            },
        });

        return {
            status: 200,
            data: account,
        };
    } catch (error) {
        return errLog(error);
    }
}
