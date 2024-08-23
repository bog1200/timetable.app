"use client"

import {useEffect, useState} from "react";
import Image from "next/image";
import {Session} from "next-auth";
import {getSession} from "next-auth/react";
import Logout from "@/app/auth/signout/logout";

export default function Hamburger() {
    const [open, setOpen] = useState(false);
    const [session, setSession] = useState<Session|null>(null);
    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
        });
    }, []);
    return (
        <>
            {session?.user?.name && session?.user?.image && <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full self-center"
                onClick={() => setOpen(!open)}
            />}
            {open && <div className={"absolute top-[90px] right-0 w-1/2 md:w-1/3 lg:1/4 h-fit bg-white bg-opacity-90 rounded-lg z-50 p-4"}>
                <Logout></Logout>
            </div>}
        </>
    )
}