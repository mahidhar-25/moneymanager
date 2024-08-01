import { useState } from "react";
import DatePicker from "react-datepicker";
import InputField from "@/components/utils/form/input";
import { TransactionType } from "@/types/LendingManager";
import { createTransactionAction } from "@/app/actions/transaction";
import { useRouter } from "next/navigation";
import { AccountStatus } from "@prisma/client";
import Button from "../utils/common/button";

export default function CreateTransaction({
    setCreateTransaction,
    accountId,
}: {
    accountId: string;
    setCreateTransaction: () => void;
}) {
    const [endDate, setEndDate] = useState(new Date());
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState<
        TransactionType | undefined
    >();
    const router = useRouter();

    function formatDate(date: Date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    async function handleTransaction(type: TransactionType) {
        const username = "mahidhar100008@gmail.com";
        const transaction = {
            username,
            accountId: accountId,
            transactionType: type,
            amount: transactionAmount,
            transactionDate: endDate,
        };
        console.log(transaction);

        const res = await createTransactionAction(transaction);
        setCreateTransaction();
        setTransactionType(undefined);
        setTransactionAmount(0);
        router.refresh();
        window.location.reload();
    }

    return (
        <div>
            <Button text="Back" handler={() => window.history.back()} />
            <div className="flex flex-row justify-around mt-2">
                <div className="w-1/3">
                    <InputField
                        inputLabel="Transaction Amount"
                        id="transactionAmount"
                        name="transactionAmount"
                        type="number"
                        required={true}
                        autoComplete="transactionAmount"
                        placeholder="100000"
                        value={transactionAmount}
                        onChange={(e) =>
                            setTransactionAmount(parseFloat(e.target.value))
                        }
                    />
                </div>
                <div className="w-1/3">
                    <label
                        htmlFor="endDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Transaction Date
                    </label>
                    <div className="relative max-w-sm mt-2">
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => {
                                if (date !== null) {
                                    setEndDate(date);
                                }
                            }}
                            placeholderText={formatDate(endDate)}
                            className="ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row-reverse mx-2 my-2">
                <Button
                    text="CREDIT"
                    handler={() => handleTransaction(TransactionType.CREDIT)}
                />
                <Button
                    text="DEBIT"
                    handler={() => handleTransaction(TransactionType.DEBIT)}
                />
            </div>
        </div>
    );
}
