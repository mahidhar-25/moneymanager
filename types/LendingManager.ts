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
    principal: number;
    interest: number;
    transactionType: TransactionType;
    amount: number;
    startDate?: Date;
    paidDate?: Date;
};

export type LendingUserAccount = {
    id: string;
    principal: number;
    interestRate: number;
    startDate: Date;
    endDate?: Date | undefined | null;
    createdAt?: Date;
    updatedAt?: Date;
    username?: string;
    compounded: boolean;
    forNoOfYears: number;
    userId: string;
    transactions: Transaction[];
};
