import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import client from "@/db/index";

import { getAllLendingUserAccountsData } from "@/app/helpers/lendingManagerFunctions";
export async function POST(req: NextRequest) {
    const data = await getAllLendingUserAccountsData();
    return NextResponse.json({ data });
}
