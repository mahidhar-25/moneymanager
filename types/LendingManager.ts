import { AccountStatus } from "@prisma/client";

export interface TableColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
    circle?: boolean;
    circleColor?: string;
}

export interface TableData {
    [key: string]: string | number;
}

export interface TableProps {
    columns: TableColumn[];
    rows: TableData[];
    rowsPerPageOptions?: number[];
    initialRowsPerPage?: number;
    onRowClick: (row: TableData) => void;
}
export enum TransactionType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
}

export type Transaction = {
    id: string;
    username?: string;
    accountId: string;
    transactionType: TransactionType;
    amount: number;
    transactionDate: Date;
};

export type LendingUserAccount = {
    id: string;
    principal: number;
    interestRate: number;
    startDate: Date;
    endDate: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    username?: string;
    compounded: boolean;
    forNoOfYears: number;
    userId: string;
    transactions: Transaction[];
    accountStatus: AccountStatus;
};

export type userManager = {
    id: string;
    name: string;
    phoneNo: string;
    state: string;
    city: string;
    pincode: string;
    address: string;
    accounts: LendingUserAccount[];
};

export type Users = {
    id: string;
    name: string;
    phoneNo: string;
    state: string;
    city: string;
    pincode: string;
    address: string;
};

export type Account = {
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
    accountStatus: AccountStatus;
};
