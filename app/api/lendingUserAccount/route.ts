import { NextRequest, NextResponse } from "next/server";
import { createLendingUserAccountAction } from "@/app/actions/lenderUserAccount";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body) {
            return NextResponse.json({
                message: "Please provide the appropriate body",
                status: 400,
            });
        }

        const createResult = await createLendingUserAccountAction(body);
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
