"use client";

import TableComponent from "@/components/utils/common/stickyHeaderTable";
import InputField from "@/components/utils/form/input";
import { useEffect, useState } from "react";
import { TableColumn, TableData, Users } from "@/types/LendingManager";
import { updateTableData } from "@/app/helpers/uiChanges";
import CreateUser from "@/components/lenderManager/createUser";
import { useRouter, usePathname } from "next/navigation";
import { getAllUsers } from "@/app/actions/lenderUserAccount";
import { cleanupUserData } from "@/app/helpers/lendingManagerFunctions";
import Button from "@/components/utils/common/button";

const columns: TableColumn[] = [
    { id: "name", label: "Name", minWidth: 100 },
    {
        id: "city",
        label: "city",
        minWidth: 170,
    },
];

interface TableDataValues {
    id: string;
    name: string;
    city: string;
    [key: string]: any;
}

export default function lenderManager() {
    const [searchInput, setSearchInput] = useState("");
    const [isCreateUser, setIsCreateUser] = useState(false);
    const [users, setUsers] = useState<Users[]>([]);

    const [tableData, setTableData] = useState<TableDataValues[]>([]);
    const rows: TableData[] = [...tableData];

    const router = useRouter();
    const currentPath = usePathname();

    useEffect(() => {
        const updateTable = async (searchInput: string) => {
            const getTableData = await updateTableData(searchInput, users);
            setTableData(getTableData);
        };
        updateTable(searchInput);
    }, [searchInput]); // Add getUsers as a dependency

    useEffect(() => {
        const getAllUsersData = async () => {
            try {
                const usersData = await getAllUsers();

                if (usersData.status !== 200) {
                    console.error("Failed to fetch users data:", usersData);
                    return;
                }

                if ("data" in usersData && typeof usersData.data === "object") {
                    const { data } = usersData;
                    setUsers(data);

                    const cleanedData = await cleanupUserData(data);
                    setTableData(cleanedData);
                }
            } catch (error) {
                console.error("Error fetching users data:", error);
            }
        };

        getAllUsersData();
    }, []);

    function handleClick(row: TableData) {
        router.push(`${currentPath}/${row.id}`);
    }

    return (
        <div>
            {!isCreateUser && (
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
                                required={false}
                            />
                        </div>
                        <div className="flex flex-row justify-end me-4">
                            <Button
                                text="Create User"
                                handler={() => {
                                    setIsCreateUser(!isCreateUser);
                                }}
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

            {isCreateUser && (
                <CreateUser setCreateUser={() => setIsCreateUser(false)} />
            )}
        </div>
    );
}
