import Image from "next/image";
import Logout from "@/app/auth/signout/logout";
import { DateTime } from "luxon";

import { DayView } from "@/app/components/dayView";
import {auth} from "@/auth";
import {Suspense} from "react";
import {redirect} from "next/navigation";

export default async function HomePage({params, searchParams}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const session = await auth() // Get session data on the client-side
    if (!session) {
        return redirect("/auth/signin");
    }
    let currentDay =searchParams?.day ? DateTime.fromISO(searchParams.day as string) : DateTime.now();

    // Adjust start and end time based on currentDay
    const start = new Date(currentDay.year, currentDay.month - 1, currentDay.day, 0, 0, 0);
    const end = new Date(currentDay.year, currentDay.month - 1, currentDay.day, 23, 59, 59);
    return (
        <div className="flex flex-col items-center m-4 h-screen">
            {session?.user?.name && session?.user?.image ? (
                <>
                    <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
                    <Image
                        src={session?.user?.image}
                        alt={session?.user?.name}
                        width={72}
                        height={72}
                        className="rounded-full"
                    />
                </>
            ) : (""
                )}
            <Logout/>
            <div className="w-full flex items-center justify-center space-x-4 my-4">
                <a href={`?day=${currentDay.minus({week: 1}).toISODate()}`}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Prev Week
                </a>
                <a href={`?day=${currentDay.minus({days: 1}).toISODate()}`}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Prev Day
                </a>
                <h1 className={"text-3xl w-1/3 text-center"}>{start.getDate().toString().padStart(2, "0")}.{(start.getMonth() + 1).toString().padStart(2, "0")}.{start.getFullYear()}</h1>
                <a href={`?day=${currentDay.plus({days: 1}).toISODate()}`}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Next Day
                </a>
                <a href={`?day=${currentDay.plus({week: 1}).toISODate()}`}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Next Week
                </a>

            </div>
            <div className={"w-full flex items-center flex-col"}>
                <Suspense fallback={<p>Loading events...</p>}>

                    <DayView user={session?.user?.email} start={start} end={end} />
            </Suspense>
            </div>
        </div>
    );
};

