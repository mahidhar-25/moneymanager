import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import client from "@/db/index";

export async function POST(req: NextRequest) {
    const body = await req.json();

    return NextResponse.json({
        username: body.username,
        password: body.password,
    });
}
