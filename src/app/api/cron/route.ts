"use server"
import type { NextApiRequest} from 'next'
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/db";
import {DateTime} from "luxon";


export async function GET(
    req: NextRequest,
) {
    const pingStartBound = DateTime.now().toJSDate();
    const pingEndBound = DateTime.now().plus({minute: 5}).toJSDate();
    const events = await
    prisma.event.findMany({
        select: {
            uid: true,
            startTime: true,
            title: true,
        },
        where: {
            startTime: {
                gte: pingStartBound,
                lte: pingEndBound
            }
        }
    })
    return NextResponse.json({events}, { status: 200 });
}

