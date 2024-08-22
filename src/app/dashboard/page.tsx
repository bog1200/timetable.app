"use client";
import { DateTime } from "luxon";

import { DayView } from "@/app/components/dayView";
import {Suspense, useEffect, useState} from "react";



export default  function HomePage() {
    const [currentDay, setCurrentDay] = useState<DateTime>(DateTime.now());
    // Adjust start and end time based on currentDay
    const start = currentDay.startOf('day')
    useEffect(() => {
        // register service worker
        if ('serviceWorker' in navigator) {
            console.log("Loading Service Worker");
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('SW registered: ', registration);
                }).catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }, []);
    useEffect(() => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then();
        }
    }, []);



    return (
        <div className="flex flex-col items-center m-4 h-screen">
            <div className="w-full flex items-center justify-center space-x-4 my-4">
                <button onClick={() => {setCurrentDay(currentDay.minus({week: 1}))}}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Prev Week
                </button>
                <button onClick={() => {setCurrentDay(currentDay.minus({days: 1}))}}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Prev Day
                </button>
                <h1 className={"text-3xl hidden md:block w-1/3 text-center"}>{start.day}.{(start.month).toString().padStart(2, "0")}.{start.year}</h1>
                <button onClick={() => {setCurrentDay(currentDay.plus({days: 1}))}}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Next Day
                </button>
                <button onClick={() => {setCurrentDay(currentDay.plus({week: 1}))}}
                   className="px-4 py-4 bg-blue-500 text-white rounded">
                    Next Week
                </button>

            </div>
            <h1 className={"text-3xl md:hidden w-full text-center"}>{start.day}.{(start.month).toString().padStart(2, "0")}.{start.year} </h1>


            <div className={"w-full flex items-center flex-col"}>
                <a href={"/dashboard/new"}
                   className={"w-[80%] bg-green-500 text-white h-20 rounded-full my-5 text-2xl py-5 text-center"}>New
                    Event</a>
                <Suspense fallback={<h1 className={"p-4 text-lg"}>Loading events...</h1>}>

                    <DayView start={start}/>
                </Suspense>
            </div>
        </div>
    );
};

