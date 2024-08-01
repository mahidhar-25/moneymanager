import { createLendingUserAction } from "@/app/actions/lenderManager";
import { createLendingUserAccountAction } from "@/app/actions/lenderUserAccount";
import InputField from "@/components/utils/form/input";
// import { userUserStore } from "@/store/global/user";
import {
    useUserManagerStore,
    useAccountStore,
} from "@/store/lenderManager/lenderManager";
import { accountSchemaValidation } from "@/zod/LenderManager/user";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorTable from "../utils/common/ErrorTable";
import { AccountStatus } from "@prisma/client";
import Button from "../utils/common/button";
export default function CreateAccount({
    setCreateAccount,
    userId,
}: {
    setCreateAccount: () => void;
    userId: string;
}) {
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    // const { username } = userUserStore((state) => state.user);
    const addLendingUser = useUserManagerStore((state) => state.addLenderUser);

    const [principal, setPrincipal] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [compounded, setCompounded] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [frequencyMonths, setFrequencyMonths] = useState(0);
    const [errors, setErrors] = useState<{ path: string; message: string }[]>(
        []
    );
    const [selectedUser, setSelectedUser] = useState("");
    const getUserAccounts = useUserManagerStore(
        (state) => state.getLendingUserNames
    );

    const userAccounts = getUserAccounts();

    async function createAccountHandler() {
        const username = "mahidhar100008@gmail.com";
        const account = {
            username,
            principal,
            interestRate,
            startDate: startDate ?? new Date(),
            endDate,
            compounded,
            forNoOfYears: parseFloat((frequencyMonths / 12).toFixed(2)),
            userId,
            accountStatus: AccountStatus.OPEN,
        };

        const data = accountSchemaValidation(account);
        if (data !== null) {
            setErrors(data);
            return;
        }
        setErrors([]);
        const res = await createLendingUserAccountAction(account);
        if (
            res.status !== 200 &&
            "errors" in res &&
            res.errors &&
            res.errors.length > 0
        ) {
            setErrors(res.errors);
            return;
        }

        setCreateAccount();
        window.location.reload();
    }
    return (
        <div>
            <Button text="Back" handler={() => window.history.back()} />

            <div className="flex flex-col justify-center ">
                <div className="flex flex-row justify-around mt-2">
                    <div className="w-1/3">
                        <InputField
                            inputLabel="Principal Amount"
                            id="principal"
                            name="principal"
                            type="number"
                            required
                            autoComplete="principal"
                            placeholder="100000"
                            value={principal}
                            onChange={(e) =>
                                setPrincipal(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="w-1/3">
                        <InputField
                            inputLabel="Interest Rate"
                            id="interestRate"
                            name="interestRate"
                            type="number"
                            required
                            autoComplete="interestRate"
                            placeholder="10"
                            value={interestRate}
                            onChange={(e) =>
                                setInterestRate(parseFloat(e.target.value))
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-around mt-2">
                    <div className="w-1/3 ">
                        <label className="inline-flex items-center cursor-pointer mt-7">
                            <input
                                defaultChecked
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={compounded}
                                onClick={() => setCompounded(!compounded)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Compounded
                            </span>
                        </label>
                    </div>
                    <div className="w-1/3">
                        <label
                            htmlFor="startDate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Start Date{" "}
                            <span className="text-red-500 me-1">*</span>
                        </label>
                        <div className="relative max-w-sm mt-2">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="Start date"
                                className="ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-around mt-2">
                    <div className="w-1/3">
                        <label
                            htmlFor="endDate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            End Date
                        </label>
                        <div className="relative max-w-sm mt-2">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText="End date"
                                className="ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {compounded && (
                        <div className="w-1/3">
                            <InputField
                                inputLabel="Compounded Frequency(in months)"
                                id="compoundedFrequency"
                                name="compoundedFrequency"
                                type="number"
                                required
                                autoComplete="compoundedFrequency"
                                placeholder="3"
                                value={frequencyMonths}
                                onChange={(e) =>
                                    setFrequencyMonths(
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                    )}
                    {!compounded && <div className="w-1/3"></div>}
                </div>

                <div className="flex flex-row mt-3 justify-center">
                    <div className="w-2/3"></div>
                    <div className="mt-4 justify-center">
                        <Button
                            text=" Create Account"
                            handler={createAccountHandler}
                        />
                    </div>
                </div>

                <ErrorTable errors={errors} />
            </div>
        </div>
    );
}
