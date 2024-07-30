import useUserManagerStore, {
    userManager,
} from "@/store/lenderManager/lenderManager";
import { getDateDifference } from "./dateTime";
import { calculateCompoundInterest, CompoundingDetail } from "./interest";
import type { LendingUserAccount } from "@/types/LendingManager";
interface TableDataValues {
    accountId: string;
    timeLength: string;
    principal: number;
    interest: number;
    startDate: string | Date;
    endDate: string | Date;
    compoundingDetails?: CompoundingDetail[];
    name: string;
    [key: string]: any;
}

export function updateTableData(searchInput: string, getUsers: userManager[]) {
    const getTableData = getUsers.flatMap((user) => {
        const userAccountedData = user.accounts.map(
            (account: Partial<LendingUserAccount>) => {
                const accountData = {
                    principal: account.principal ?? 0,
                    interestRate: account.interestRate ?? 0,
                    startDate: account.startDate ?? new Date(),
                    endDate: "",
                    compounded: account.compounded ?? false,
                    forNoOfYears: account.forNoOfYears ?? 0,
                };
                const compoundData = calculateCompoundInterest(accountData);
                const timeDiff = getDateDifference(
                    compoundData.startDate,
                    compoundData.endDate
                );
                const tableData = {
                    name: user.name,
                    ...compoundData,
                    accountId: account.id,
                    timeLength: timeDiff.totalTime,
                };
                return tableData;
            }
        );
        return userAccountedData;
    });

    if (!searchInput) {
        return getTableData;
    } else {
        const filteredTableData = getTableData.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        return filteredTableData;
    }
}
