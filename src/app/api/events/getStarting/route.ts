import prisma from "@/db";
import {NextRequest, NextResponse} from "next/server";
import { auth } from "@/auth";
import {DateTime} from "luxon";

async function getEvents() {
    const session = await auth();
    const events = await prisma.event.findMany({
        where: {
            uid: {equals: session!.user!.email},
            startTime: {gte: DateTime.now().toJSDate(), lte: DateTime.now().plus({minute: 1}).toJSDate() }
        },
        orderBy: {
            startTime: 'asc'
        }
    });
    if (events) {
        return events;
    }
}

export async function GET(req: NextRequest) {
    const events = await getEvents();
    return NextResponse.json({events}, {status: 200});
}