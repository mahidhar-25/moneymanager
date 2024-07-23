import { NextRequest, NextResponse } from "next/server";
import { getAllLendingUserAction } from "@/app/actions/lenderManager";

export async function GET(req: NextRequest) {
    const [username] = req.nextUrl.pathname.split("/").slice(-1);

    // Validate query parameters
    if (!username || typeof username !== "string") {
        return NextResponse.json(
            { message: "Invalid query parameters" },
            { status: 400 }
        );
    }

    // Call the action and handle the response
    try {
        const result = await getAllLendingUserAction(username);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error in getLendingUserAction:", error);
        return NextResponse.json({
            message: "Internal server error",
            status: 500,
        });
    }
}
