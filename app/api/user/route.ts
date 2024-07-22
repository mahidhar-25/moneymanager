import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
export async function POST(req: NextRequest) {
    const body = await req.json();

    return NextResponse.json({ username: body.username, password: body.password })
}