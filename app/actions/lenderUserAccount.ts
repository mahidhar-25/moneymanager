"use server";

import client from "@/db/index";
import { AccountStatus } from "@prisma/client";
import { z } from "zod";

interface LendingUserAccount {
    principal: number;
    interestRate: number;
    startDate: Date;
    endDate?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    username?: string;
    compounded: boolean;
    forNoOfYears: number;
    userId: string;
    accountStatus: AccountStatus;
}

type updateUserAccount = {
    id: string;
    principal: number;
    startDate: Date;
};

function errLog(error: any) {
    let msg = "failed while creating";
    if (error instanceof Error) {
        console.error("An error occurred:", error.message);
        msg = error.message;
    } else {
        console.error("An unknown error occurred:", error);
    }
    return {
        status: 400,
        errors: [
            {
                path: "database",
                message: msg,
            },
        ],
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
                errors: "User not found",
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

export async function getAllLendingUserAccountsDataByUsernameAction(
    username: string
) {
    try {
        const lendingUserAccounts = await client.lendUserAccount.findMany({
            where: {
                username,
            },
        });

        if (!lendingUserAccounts) {
            return {
                status: 404,
                errors: [{ message: "User not found", path: "user" }],
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

export async function getAllUsersAndAccounts() {
    try {
        const username = "mahidhar100008@gmail.com";
        const users = await client.lendingUser.findMany({
            where: {
                username,
            },
            include: {
                LendUserAccount: true,
            },
        });
        return {
            status: 200,
            data: users,
        };
    } catch (error) {
        return errLog(error);
    }
}

export async function getAllUsers() {
    try {
        const username = "mahidhar100008@gmail.com";
        const users = await client.lendingUser.findMany({
            where: {
                username,
            },
        });
        return {
            status: 200,
            data: users,
        };
    } catch (error) {
        return errLog(error);
    }
}
