"use server"
import type { NextApiRequest} from 'next'
import {NextRequest, NextResponse} from "next/server";


export async function GET(
    req: NextRequest,
) {
  return NextResponse.json({ message: 'Hello from GET' }, { status: 418 });
}

