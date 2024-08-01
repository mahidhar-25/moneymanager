"use server";

import client from "@/db/index";
import { z } from "zod";

interface LendingUser {
    name: string;
    phoneNo: string;
    state: string;
    city: string;
    pincode: string;
    address: string;
    username?: string;
}

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
export async function createLendingUserAction(lendingUser: LendingUser) {
    try {
        const alreadyUserExist = await client.lendingUser.findUnique({
            where: {
                name: lendingUser.name,
            },
        });

        if (alreadyUserExist) {
            return {
                status: 400,
                errors: [
                    {
                        path: "name",
                        message: "!user already exists have it unique",
                    },
                ],
            };
        }

        const username = lendingUser.username
            ? lendingUser.username
            : "mahidhar100008@gmail.com";
        // Create the new lending user
        const user = await client.lendingUser.create({
            data: {
                ...lendingUser,
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

export async function getLendingUserAction(name: string, username: string) {
    try {
        const lendingUser = await client.lendingUser.findUnique({
            where: {
                name: name,
                username: username,
            },
        });

        if (!lendingUser) {
            return {
                status: 404,
                message: "User not found",
            };
        }

        return {
            status: 200,
            data: lendingUser,
        };
    } catch (error) {
        return errLog(error);
    }
}

export async function getAllLendingUserAction(username: string) {
    try {
        const lendingUsers = await client.lendingUser.findMany({
            where: {
                username: username,
            },
        });

        if (!lendingUsers) {
            return {
                status: 404,
                message: "Users not found",
            };
        }

        return {
            status: 200,
            data: lendingUsers,
        };
    } catch (error) {
        return errLog(error);
    }
}
