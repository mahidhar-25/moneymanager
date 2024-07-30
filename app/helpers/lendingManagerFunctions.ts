import { getAllLendingUserAccountsDataByUsernameAction } from "../actions/lenderUserAccount";
import { getDateDifference } from "./dateTime";
import { calculateCompoundInterest } from "./interest";
type Account = {
    id: string;
    userId: string;
    principal: number;
    interestRate: number;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    compounded: boolean;
    forNoOfYears: number;
};

type UpdatedAccounts = {
    id: string;
    userId: string;
    principal: number;
    interestRate: number;
    startDate: Date;
    endDate: Date | null;
    username: string;
    compounded: boolean;
    forNoOfYears: number;
};
export async function getAllLendingUserAccountsData() {
    try {
        const username = "mahidhar100008@gmail.com";
        const res = await getAllLendingUserAccountsDataByUsernameAction(
            username
        );
        let accounts: Account[] | string = res.data;
        let updatedAccounts: UpdatedAccounts[] = [];
        if (Array.isArray(accounts)) {
            updatedAccounts = accounts.map(
                ({ createdAt, updatedAt, ...rest }) => rest
            );
        }
        const finalDetails = [];
        if (updatedAccounts && updatedAccounts.length > 0) {
            for (let i = 0; i < updatedAccounts.length; i++) {
                const {
                    principal,
                    interestRate,
                    startDate,
                    endDate,
                    compounded,
                    forNoOfYears,
                } = updatedAccounts[i];

                const finalEndDate =
                    endDate?.toISOString() ||
                    new Date("2026-08-23").toISOString();

                const result = calculateCompoundInterest({
                    principal,
                    interestRate,
                    startDate: startDate.toISOString(),
                    endDate: finalEndDate,
                    compounded,
                    forNoOfYears,
                });

                const getTimeString = getDateDifference(
                    new Date(startDate),
                    new Date(finalEndDate)
                );

                finalDetails.push({
                    ...result,
                    timeLength: getTimeString.totalTime,
                });
            }
        }
        return {
            finalDetails,
        };
    } catch (error) {
        console.log(error);
    }

    //get all accounts details with respect to users
}
