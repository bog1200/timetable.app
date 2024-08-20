import prisma from "@/db";
import {NextRequest, NextResponse} from "next/server";
import { auth } from "@/auth";
import {DateTime} from "luxon";

async function getEvents(start: Date, end: Date) {
    const session = await auth();
    const events = await prisma.event.findMany({
        where: {
            uid: {equals: session!.user!.email},
            OR: [
                {
                    startTime: {gte: start, lte: end}
                },
                {
                    endTime: {gte: start, lte: end}
                },
                {
                    startTime: {lte: start},
                    endTime: {gte: end}
                }
            ]

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
    const searchParams = req.nextUrl.searchParams
    const start = DateTime.fromFormat(<string>searchParams.get('day'),'yyyy-M-d')
    const end =  start.endOf("day");
    const events = await getEvents(start.toJSDate(), end.toJSDate());
    return NextResponse.json({events}, {status: 200});
}