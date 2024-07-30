"use server";
import type {
    userManager,
    TransactionType,
} from "@/store/lenderManager/lenderManager";
import client from "@/db/index";

export const getAllLendingUserDetails = async (
    username: string
): Promise<userManager[]> => {
    const lendingUsers = await client.lendingUser.findMany({
        where: {
            username,
        },
        include: {
            LendUserAccount: {
                include: {
                    paidTransactions: true,
                },
            },
        },
    });

    const formattedUsers: userManager[] = lendingUsers.map((user) => ({
        id: user.id,
        name: user.name,
        phoneNo: user.phoneNo,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        accounts: user.LendUserAccount.map((account) => ({
            id: account.id,
            principal: account.principal,
            interestRate: account.interestRate,
            startDate: account.startDate,
            endDate: account.endDate,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
            username: account.username,
            compounded: account.compounded,
            forNoOfYears: account.forNoOfYears,
            userId: account.userId,
            transactions: account.paidTransactions.map((transaction) => ({
                id: transaction.id,
                username: transaction.username,
                accountId: transaction.accountId,
                principal: transaction.principal,
                interest: transaction.interest,
                transactionType: transaction.transactionType as TransactionType, // Cast the transactionType to TransactionType
                amount: transaction.amount,
                startDate: transaction.startDate,
                paidDate: transaction.paidDate,
            })),
        })),
    }));
    return formattedUsers;
};
