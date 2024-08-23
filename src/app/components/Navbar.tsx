"use client"

import Hamburger from "@/app/components/hamburger";

export default function Navbar() {
    return (
        <nav className={"flex justify-center p-4 border-b-2 border-black bg-white fixed top-0 left-0 w-full "}>

            <div className={"w-full font-[900] text-3xl mt-4 "}>

                <a href={"/dashboard"} className={"h-full"}>
                    <svg className={"inline size-8"}>
                        <path
                            d="M 0 0 L 0 24 L 24 24 L 24 0 L 0 0 M 2 2 L 2 22 L 22 22 L 22 2 L 2 2 M 5 5 L 5 19 L 19 19 L 19 5 L 5 5 M 7 7 L 7 17 L 17 17 L 17 7 L 7 7 M 9 9 L 9 15 L 15 15 L 15 9 L 9 9 Z"/>
                    </svg>
                    Timetable.app</a></div>

            <div className={"w-fit flex h-[72px] "}>
                <Hamburger/>
               </div>


        </nav>

    )
}