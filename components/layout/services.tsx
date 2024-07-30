"use client";
import { getAllLendingUserDetails } from "@/app/actions/getAllUsers";
import { userUserStore } from "@/store/global/user";
import useUserManagerStore from "@/store/lenderManager/lenderManager";
import { useRouter } from "next/navigation";

export default function Services() {
    const route = useRouter();
    const { username } = userUserStore((state) => state.user);
    const updateUserManager = useUserManagerStore(
        (state) => state.updateUserManager
    );

    async function moveToLenderManagerService() {
        const usersData = await getAllLendingUserDetails(username);
        updateUserManager(usersData);
        route.push("/services/lenderManager");
    }
    return (
        <div className="border-r p-2 w-1/5">
            <div className="text-center mx-auto border-b p-3 bg-cyan-400">
                <div onClick={moveToLenderManagerService}>Lender Manager</div>
            </div>
        </div>
    );
}
