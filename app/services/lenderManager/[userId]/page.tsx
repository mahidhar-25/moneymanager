"use client";

import TableComponent from "@/components/utils/common/stickyHeaderTable";
import InputField from "@/components/utils/form/input";
import { useUserManagerStore } from "@/store/lenderManager/lenderManager";
import { useEffect, useState } from "react";
import { CompoundingDetail } from "@/app/helpers/interest";
import { Account, TableColumn, TableData } from "@/types/LendingManager"; // Assume these interfaces are exported from a types file
import CreateAccount from "@/components/lenderManager/createAccount";
import {
    updateAccountTableData,
    updateTableData,
} from "@/app/helpers/uiChanges";
import CreateUser from "@/components/lenderManager/createUser";
import { getAllLendingUserDetails } from "@/app/actions/getAllUsers";
import { isEqual } from "lodash-es";
import { useRouter, usePathname } from "next/navigation";
import { getAllLendingUserAccountAction } from "@/app/actions/lenderUserAccount";
import { cleanupAccountsData } from "@/app/helpers/lendingManagerFunctions";
import Button from "@/components/utils/common/button";
// const router = useRouter();

const columns: TableColumn[] = [
    {
        id: "principal",
        label: "Principal",
        minWidth: 170,
        format: (value: number) => value.toLocaleString("en-US"),
        circle: true,
        circleColor: "#15f554",
    },
    {
        id: "interest",
        label: "Interest",
        minWidth: 170,
        format: (value: number) => value.toLocaleString("en-US"),
        circle: true,
        circleColor: "#fc3a44",
    },
    {
        id: "compounded",
        label: "Compounded",
        minWidth: 170,
    },
    {
        id: "timeLength",
        label: "Time",
        minWidth: 170,
        circle: true,
        circleColor: "#2dcbee",
    },
    {
        id: "accountStatus",
        label: "Account Status",
    },
];

interface TableDataValues {
    accountId: string;
    timeLength: string;
    principal: number;
    interest: number;
    startDate: string | Date;
    endDate: string | Date;
    compoundingDetails: CompoundingDetail[];
    name: string;
}

type AccountWithCompoundingDetails = {
    timeLength: string;
    principal: number;
    interest: number;
    startDate: string | Date;
    endDate: string | Date;
    compounded: string;
    compoundingDetails?: CompoundingDetail[];
    accountId: string;
    userId: string;
    [key: string]: any;
};

export default function lendingUserAccounts({
    params,
}: {
    params: { userId: string };
}) {
    const [searchInput, setSearchInput] = useState("");
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isCreateAccount, setCreateAccount] = useState(false);
    const [filter, setFilter] = useState("OPEN");
    const [compounded, setCompounded] = useState(false);

    const [tableData, setTableData] = useState<AccountWithCompoundingDetails[]>(
        []
    );
    const rows: TableData[] = [...tableData];

    const router = useRouter();
    const currentPath = usePathname();
    const userId = params.userId;

    useEffect(() => {
        const updateTable = async (
            searchInput: string,
            filter: string,
            compounded: boolean
        ) => {
            console.log(
                "search : ",
                searchInput,
                " filter : ",
                filter,
                "accounts : ",
                accounts
            );
            const getTableData = await updateAccountTableData(
                searchInput,
                filter,
                compounded,
                accounts
            );
            console.log("tabledata : ", getTableData);
            setTableData(getTableData);
        };

        updateTable(searchInput, filter, compounded);
        console.log(tableData);
    }, [searchInput, filter, compounded]); // Add getUsers as a dependency

    useEffect(() => {
        const getAllLendingUserDetailsAsync = async () => {
            const acountsData = await getAllLendingUserAccountAction(userId);
            if ("data" in acountsData) {
                const { data } = acountsData;
                if (typeof data !== "object") {
                    return;
                }
                console.log("mount data : ", data);
                setAccounts(data);
                const getTableData = await updateAccountTableData(
                    searchInput,
                    filter,
                    compounded,
                    data
                );
                setTableData(getTableData);
            }
        };
        getAllLendingUserDetailsAsync();
    }, []);

    function handleClick(row: TableData) {
        router.push(`${currentPath}/${row.accountId}`);
    }

    return (
        <div>
            {!isCreateAccount && (
                <>
                    <Button text="Back" handler={() => window.history.back()} />
                    <div className="flex flex-row mb-2 justify-between">
                        <div className="flex flex-row w-1/2 justify-between space-x-4">
                            <div className="w-1/2">
                                <InputField
                                    className="ms-3"
                                    id="search_lender"
                                    name="search"
                                    type="search"
                                    autoComplete="search"
                                    placeholder="enter amount"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    required={false}
                                />
                            </div>
                            <div className="flex flex-row items-center w-1/3 space-x-2 ms-3">
                                <label
                                    htmlFor="status-select"
                                    className="whitespace-nowrap"
                                >
                                    Account Status:
                                </label>
                                <select
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="status-select"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="OPEN">Open</option>
                                    <option value="CLOSE">Closed</option>
                                    <option value="ALL">Both</option>
                                </select>
                            </div>
                            <div className="w-1/3 ">
                                <label className="inline-flex items-center cursor-pointer mt-3">
                                    <input
                                        defaultChecked
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                        checked={compounded}
                                        onClick={() =>
                                            setCompounded(!compounded)
                                        }
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">
                                        Compounded
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-row justify-end me-4">
                            <Button
                                text="Create Account"
                                handler={() =>
                                    setCreateAccount(!isCreateAccount)
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <TableComponent
                            columns={columns}
                            rows={rows}
                            onRowClick={handleClick}
                        />
                    </div>
                </>
            )}
            {isCreateAccount && (
                <CreateAccount
                    setCreateAccount={() => setCreateAccount(false)}
                    userId={userId}
                />
            )}
        </div>
    );
}
