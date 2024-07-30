"use client";
import { getDateDifference } from "@/app/helpers/dateTime";
import { calculateCompoundInterest } from "@/app/helpers/interest";
import TableComponent from "@/components/utils/common/stickyHeaderTable";
import InputField from "@/components/utils/form/input";
import useUserManagerStore from "@/store/lenderManager/lenderManager";
import { useEffect, useState } from "react";
import { CompoundingDetail } from "@/app/helpers/interest";

import { TableColumn, TableData } from "@/types/LendingManager"; // Assume these interfaces are exported from a types file
import CreateAccount from "@/components/lenderManager/createAccount";
import { updateTableData } from "@/app/helpers/uiChanges";

const columns: TableColumn[] = [
    { id: "name", label: "Name", minWidth: 100 },
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
        id: "timeLength",
        label: "Time",
        minWidth: 170,
        circle: true,
        circleColor: "#2dcbee",
    },
];

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

export default function lenderManager() {
    const [searchInput, setSearchInput] = useState("");
    const [isCreateAccount, setCreateAccount] = useState(false);
    const getUsers = useUserManagerStore((state) => state.lendingUsers);

    const [tableData, setTableData] = useState<TableDataValues[]>([]);
    const rows: TableData[] = [...tableData];
    useEffect(() => {
        const getTableData = updateTableData(searchInput, getUsers);
        setTableData((prevState) => {
            return getTableData.map((item) => {
                return {
                    ...item,
                    accountId: item.accountId || "",
                };
            });
        });
    }, [searchInput, getUsers]);

    function handleClick(row: TableData) {
        console.log(row);
    }

    return (
        <div>
            {!isCreateAccount && (
                <>
                    <div className="flex flex-row mb-2 justify-between">
                        <div className="w-1/4">
                            <InputField
                                className="ms-3 "
                                id="search_lender"
                                name="search"
                                type="search"
                                autoComplete="search"
                                placeholder="enter name"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row justify-end me-4">
                            <button
                                type="button"
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={() =>
                                    setCreateAccount(!isCreateAccount)
                                }
                            >
                                Create Account
                            </button>
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
                />
            )}
        </div>
    );
}
