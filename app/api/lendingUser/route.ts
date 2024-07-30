import { NextRequest, NextResponse } from "next/server";
import {
    createLendingUserAction,
    getAllLendingUserDetails,
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

    // Call the action and handle the response
    const username = "mahidhar100008@gmail.com";
    try {
        const result = await getAllLendingUserDetails(username);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Internal server error",
            status: 500,
        });
    }
}
