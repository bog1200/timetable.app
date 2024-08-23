import prisma from "@/db";
import {NextRequest, NextResponse} from "next/server";
import { auth } from "@/auth";

async function getEvent(id: number) {
    const session = await auth();
    const event = await prisma.event.findFirst({
        where: {
            uid: {equals: session!.user!.email},
            id: id,
        },
        orderBy: {
            startTime: 'asc'
        }
    });
    if (event) {
        return event;
    }
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id');
    const event = await getEvent(parseInt(id!));
    return NextResponse.json({event}, {status: 200});
}