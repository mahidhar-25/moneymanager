import { NextRequest, NextResponse } from "next/server";
import client from "@/db/index";
import { signUpAction } from "@/app/actions/user";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const user = await signUpAction(body.username, body.password);
        return NextResponse.json({
            user,
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to parse request body or create user",
            status: 500,
        });
    }
}
