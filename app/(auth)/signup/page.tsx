import SignUpComponent from "@/components/user/signup";

export default function signIn() {
    return (
        <div className="flex flex-row w-full">
            <div className="w-2/3 h-screen bg-purple-100">
            <div className="flex justify-center items-center">
                <p className="text-7xl font-medium h-screen flex text-center items-center mx-5">Do you want to manage your money ? </p>
            </div>
            </div>
            <div className="w-1/3 h-screen flex justify-center items-center">
                <SignUpComponent />
            </div>
        </div>
    );
}
