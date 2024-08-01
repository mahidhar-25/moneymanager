import { createLendingUserAction } from "@/app/actions/lenderManager";
import InputField from "@/components/utils/form/input";
import { useUserManagerStore } from "@/store/lenderManager/lenderManager";
import { userSchemaValidation } from "@/zod/LenderManager/user";
import { set } from "date-fns";
import { useState } from "react";
import ErrorTable from "../utils/common/ErrorTable";
import { userManager } from "@/types/LendingManager";
import { useRouter } from "next/navigation";
import { userUserStore } from "@/store/global/user";
import Button from "../utils/common/button";
export default function CreateUser({
    setCreateUser,
}: {
    setCreateUser: () => void;
}) {
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [errors, setErrors] = useState<{ path: string; message: string }[]>(
        []
    );
    const { username } = userUserStore((state) => state.user);
    const addLendingUser = useUserManagerStore((state) => state.addLenderUser);
    const router = useRouter();
    interface newLendingUser {
        id: string;
        name: string;
        phoneNo: string;
        state: string;
        city: string;
        pincode: string;
        address: string;
        username: string;
    }
    async function createUserHandler() {
        const username = "mahidhar100008@gmail.com";
        const account = {
            name,
            phoneNo,
            address,
            city,
            state,
            pincode,
            username,
        };

        const data = userSchemaValidation(account);
        if (data !== null) {
            setErrors(data);
            return;
        }
        setErrors([]);
        const res = await createLendingUserAction(account);
        if (
            res.status !== 200 &&
            res.errors &&
            Array.isArray(res.errors) &&
            res.errors.length > 0
        ) {
            setErrors(res.errors);
            return;
        }
        if (res.status === 200 && res.data && typeof res.data === "object") {
            const { data } = res;
            await addLendingUser({ ...data, accounts: [] });
        }

        setCreateUser();
        window.location.reload();
    }
    return (
        <div>
            <Button text="Back" handler={setCreateUser} />

            <div className="flex flex-col justify-center ">
                <div className="flex flex-row justify-around mt-2">
                    <div className="w-1/3">
                        <InputField
                            inputLabel="Name"
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="mahidhar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-1/3">
                        <InputField
                            inputLabel="Phone No"
                            id="phoneNo"
                            name="phoneNo"
                            type="text"
                            required
                            autoComplete="phoneNo"
                            placeholder="9823451311"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-around mt-2">
                    <div className="w-1/3">
                        <InputField
                            inputLabel="Address"
                            id="address"
                            name="address"
                            type="text"
                            required
                            autoComplete="address"
                            placeholder="2-40 abc nagar xyz state"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="w-1/3">
                        <InputField
                            inputLabel="City"
                            id="city"
                            name="city"
                            type="text"
                            required
                            autoComplete="city"
                            placeholder="kurnool"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-around mt-2">
                    <div className="w-1/3">
                        <InputField
                            inputLabel="State"
                            id="state"
                            name="state"
                            type="text"
                            required
                            autoComplete="state"
                            placeholder="Andhra Pradesh"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className="w-1/3">
                        <InputField
                            inputLabel="Pincode"
                            id="pincode"
                            name="pincode"
                            type="text"
                            required
                            autoComplete="pincode"
                            placeholder="518124"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-row mt-3 justify-center">
                    <div className="w-2/3"></div>
                    <div className="mt-4 justify-center">
                        <Button
                            text="Create User"
                            handler={createUserHandler}
                        />
                    </div>
                </div>

                <ErrorTable errors={errors} />
            </div>
        </div>
    );
}
