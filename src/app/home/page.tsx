"use client"
import Image from "next/image";
import Logout from "@/app/auth/signout/logout";
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Event from "@/app/components/event";
import { PrismaClient } from "@prisma/client";
import {DayView} from "@/app/components/dayView";


const HomePage = async () => {
    const session = await auth();
    const prisma = new PrismaClient();
    const currentDay = new Date(); // get current day
    const start = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 0, 0, 0)
    const end = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 23, 59, 59)

    if (!session?.user) redirect("/");

    console.log(session);
    return (
        <div className="flex flex-col items-center m-4 bg-gray-400">
            {session?.user?.name && session?.user?.image ? (
                <>
                    <h1 className="text-3xl my-2">
                        Welcome, {session?.user?.name}
                    </h1>
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

                    <h1 className="text-3xl my-2">
                        Welcome, {session?.user?.email}
                    </h1>
                    <h2 className="text-3xl my-2">Session</h2>
                    <p className="text-3xl my-2">{session?.user?.id?.length}</p>
                </>
            )}
            <Logout />
            <DayView user={session?.user?.email} start={start} end={end} />
            {/*<div className={"m-4 justify-center   border-red-600 grid grid-rows-[24] w-full h-screen"}>*/}



            {/*</div>*/}
        </div>
    );
};

export default HomePage;