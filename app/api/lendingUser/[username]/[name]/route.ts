import { NextRequest, NextResponse } from "next/server";
import { getLendingUserAction } from "@/app/actions/lenderManager";

interface Params {
    name: string;
    username: string;
}
export async function GET(req: NextRequest) {
    const [username, name] = req.nextUrl.pathname.split("/").slice(-2);

    // Validate query parameters
    if (
        !name ||
        typeof name !== "string" ||
        !username ||
        typeof username !== "string"
    ) {
        return NextResponse.json(
            { message: "Invalid query parameters" },
            { status: 400 }
        );
    }

    // Call the action and handle the response
    try {
        const result = await getLendingUserAction(name, username);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error in getLendingUserAction:", error);
        return NextResponse.json({
            message: "Internal server error",
            status: 500,
        });
    }
}
