import { NextRequest, NextResponse } from "next/server";
import {
    createLendingUserAction,
    getLendingUserAction,
} from "@/app/actions/lenderManager";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body) {
            return NextResponse.json({
                message: "Please provide the appropriate body",
                status: 400,
            });
        }

        const createResult = await createLendingUserAction(body);
        if (createResult.status === 200) {
            return NextResponse.json({ createResult, status: 200 });
        } else {
            return NextResponse.json({ createResult, status: 400 });
        }
    } catch (error) {
        return NextResponse.json({
            message: "Failed to parse request body or create user",
            status: 500,
        });
    }
}

export async function GET(req: NextRequest) {
    // Parse the URL to get query parameters
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const username = url.searchParams.get("username");

    // Validate query parameters
    if (typeof name !== "string" || typeof username !== "string") {
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
        return NextResponse.json({
            message: "Internal server error",
            status: 500,
        });
    }
}
