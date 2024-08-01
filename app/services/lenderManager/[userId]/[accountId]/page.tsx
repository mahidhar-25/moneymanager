"use client";

import { getLendingUserAccountAction } from "@/app/actions/lenderUserAccount";
import { getAllTransactionsOfAccount } from "@/app/actions/transaction";
import CreateTransaction from "@/components/lenderManager/createTransaction";
import Button from "@/components/utils/common/button";
import TableComponent from "@/components/utils/common/stickyHeaderTable";
import { useTransactionStore } from "@/store/lenderManager/userTransactions";
import { TableColumn, TableData } from "@/types/LendingManager";
import { AccountStatus } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const columns: TableColumn[] = [
    {
        id: "amountPaid",
        label: "Amount",
        minWidth: 170,
    },
    {
        id: "transactionType",
        label: "Transaction Type",
        minWidth: 170,
    },
    {
        id: "paidDate",
        label: "Transaction Date",
        minWidth: 170,
    },
];

interface SpecificTransactionTable {
    id: string;
    amountPaid: number;
    paidDate: string;
    transactionType: string;
    [key: string]: any;
}
const rows: SpecificTransactionTable[] = [];
export default function showTransactions({
    params,
}: {
    params: { accountId: string; userId: string };
}) {
    const [transactions, setTransations] = useState<SpecificTransactionTable[]>(
        []
    );
    const [isCreateTransaction, setIsCreateTransaction] = useState(false);
    const [accountStatus, setAccountStatus] = useState<AccountStatus>(
        AccountStatus.OPEN
    );
    const accountId = params.accountId;
    const userId = params.userId;

    const updateSpecificAccountTransactionTableData = async () => {
        const transactions = await getAllTransactionsOfAccount(accountId);
        console.log(transactions);
        if (typeof transactions.data === "string") return;
        const tableData: SpecificTransactionTable[] = transactions.data.map(
            (transaction) => {
                return {
                    id: transaction.id,
                    accountId: transaction.accountId,
                    amountPaid: transaction.amount,
                    paidDate: transaction.transactionDate?.toDateString(),
                    transactionType: transaction.transactionType,
                };
            }
        );
        console.log(tableData);
        setTransations(tableData);
    };

    useEffect(() => {
        updateSpecificAccountTransactionTableData();
        const getAccount = async () => {
            const res = await getLendingUserAccountAction(accountId);
            if ("data" in res && res.data) {
                console.log(res.data.accountStatus);
                setAccountStatus(res.data.accountStatus);
            }
        };

        getAccount();
    }, []);

    function handleClick(row: TableData): void {}

    function handleCreateTransaction() {
        setIsCreateTransaction(!isCreateTransaction);
    }
    return (
        <div>
            {!isCreateTransaction && (
                <>
                    <div className="flex flex-row mx-3 justify-between">
                        <Button
                            text="Back"
                            handler={() => window.history.back()}
                        />
                        {accountStatus === AccountStatus.OPEN && (
                            <Button
                                text=" Create Transaction"
                                handler={() => setIsCreateTransaction(true)}
                            />
                        )}
                    </div>
                    <TableComponent
                        columns={columns}
                        rows={transactions}
                        onRowClick={handleClick}
                    />
                </>
            )}
            {isCreateTransaction && (
                <CreateTransaction
                    setCreateTransaction={handleCreateTransaction}
                    accountId={accountId}
                />
            )}
        </div>
    );
}
