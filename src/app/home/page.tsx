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
        <div className="flex flex-col items-center m-4 bg-gray-400">
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
            ) : (
                <>
                    <h1 className="text-3xl my-2">Welcome, {session?.user?.email}</h1>
                    <h2 className="text-3xl my-2">Session</h2>
                    <p className="text-3xl my-2">{session?.user?.id?.length}</p>
                </>
            )}
            <Logout/>
            <div className="flex space-x-4 my-4">
                <a href={`/home?day=${currentDay.minus({days: 1}).toISODate()}`} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Prev Day
                </a>
                <a href={`/home?day=${currentDay.plus({days: 1}).toISODate()}`} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Next Day
                </a>
                <p>{currentDay.toString()}</p>
            </div>
            <Suspense fallback={<p>Loading events...</p>}>

            <DayView user={session?.user?.email} start={start} end={end} />
            </Suspense>
        </div>
    );
};

