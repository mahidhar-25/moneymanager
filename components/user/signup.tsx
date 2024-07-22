"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpAction } from "@/app/actions/user";
import InputField from "@/components/utils/form/input";
import Link from "next/link";

export default function SignUpComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidation, setIsValidation] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const router = useRouter();

    const handleSignUp = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        const res = await signUpAction(email, password);
        if (res.status !== 200) {
            setErrMsg(res.message);
            setIsValidation(true);
        } else {
            setErrMsg("");
            setIsValidation(false);
            router.push("/signin");
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up to create account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <InputField
                        inputLabel="Email or Username"
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        inputLabel="Password"
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="password"
                        placeholder="Ab10@w"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div>
                    {isValidation && (
                        <div className="bg-red-500 text-white p-3 rounded-md mt-2">
                            {errMsg}
                        </div>
                    )}
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Signin now
                    </Link>
                </p>
            </div>
        </div>
    );
}
