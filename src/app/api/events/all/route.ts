import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"

import {auth} from "@/auth";

const prisma = new PrismaClient();

export async function GET( req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({}, {status: 401})
    }
    const events  = await prisma.event.findMany();
    return NextResponse.json({events}, {status: 200})


}