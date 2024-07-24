import { NextRequest, NextResponse } from "next/server";
import {
    getLendingUserAccountAction,
    getAllLendingUserAccountAction,
} from "@/app/actions/lenderUserAccount";

export async function GET(req: NextRequest) {
    const [id] = req.nextUrl.pathname.split("/").slice(-1);

    // Validate query parameters
    if (!id || typeof id !== "string") {
        return NextResponse.json(
            { message: "Invalid query parameters" },
            { status: 400 }
        );
    }

    // Call the action and handle the response
    try {
        const result = await getLendingUserAccountAction(id);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error in getLendingUserAction:", error);
        return NextResponse.json({
            message: "Internal server error",
            status: 500,
        });
    }
}

export async function POST(req: NextRequest) {
    const [id] = req.nextUrl.pathname.split("/").slice(-1);

    // Validate query parameters
    if (!id || typeof id !== "string") {
        return NextResponse.json(
            { message: "Invalid query parameters" },
            { status: 400 }
        );
    }

    // Call the action and handle the response
    try {
        const result = await getAllLendingUserAccountAction(id);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error in getLendingUserAction:", error);
        return NextResponse.json({
            message: "Internal server error",
            status: 500,
        });
    }
}
