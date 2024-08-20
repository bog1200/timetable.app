"use client";
import { DateTime } from "luxon";

import { DayView } from "@/app/components/dayView";
import {auth} from "@/auth";
import {Suspense} from "react";
import {redirect} from "next/navigation";
import {WeekView} from "@/app/components/weekView";


export default async function HomePage({params, searchParams}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const session = await auth() // Get session data on the client-side
    if (!session) {
        return redirect("/api/auth/signin");
    }
    let currentDay =searchParams?.day ? DateTime.fromISO(searchParams.day as string) : DateTime.now();

    // Adjust start and end time based on currentDay
    const start = new Date(currentDay.year, currentDay.month - 1, currentDay.day, 0, 0, 0);
    const end = new Date(currentDay.year, currentDay.month - 1, currentDay.day, 23, 59, 59);
    return (
        <div className="flex flex-col items-center m-4 h-screen">
            <div className="w-full flex items-center justify-center space-x-4 my-4">
                <a href={`?day=${currentDay.minus({week: 1}).toISODate()}`}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Prev Week
                </a>
                <a href={`?day=${currentDay.minus({days: 1}).toISODate()}`}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Prev Day
                </a>
                <h1 className={"text-3xl hidden md:block w-1/3 text-center"}>{start.getDate().toString().padStart(2, "0")}.{(start.getMonth() + 1).toString().padStart(2, "0")}.{start.getFullYear()}</h1>
                <a href={`?day=${currentDay.plus({days: 1}).toISODate()}`}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Next Day
                </a>
                <a href={`?day=${currentDay.plus({week: 1}).toISODate()}`}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Next Week
                </a>

            </div>
            <h1 className={"text-3xl md:hidden w-full text-center"}>{`${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, "0")}-${start.getDate().toString().padStart(2, "0")}`} </h1>



            <div className={"w-full flex items-center flex-col"}>
                <Suspense fallback={<p>Loading events...</p>}>

                    <DayView user={session?.user?.email} start={start} end={end}/>
                </Suspense>
            </div>
        </div>
    );
};

