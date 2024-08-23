"use client"
import { Event } from "@/definitions";
import {useEffect, useState} from "react";
import {DateTime} from "luxon";

export function DayView(props: { start: DateTime }) {
    const [events, setEvents] = useState<Event[]>([]);
    //const defferedEvents = useDeferredValue(events );
    //const isStale = defferedEvents !== events;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setEvents([]);
       const fetchEvents = async () => {
           fetch(`/api/events/getDay?day=${props.start.year}-${props.start.month.toString()}-${props.start.day}`)
               .then(res => res.json())
               .then(data => {
                   if (Array.isArray(data.events)) {
                       if (data.events.length > 0) {
                           const parsedEvents = data.events.map((event: any) => ({
                               ...event,
                               startTime: new Date(event.startTime),
                               endTime: new Date(event.endTime),
                           }));
                       setEvents(parsedEvents);
                   }
                      setLoading(false);
                   } else {
                       console.error("Expected an array, but got:", data.events);
                       //setLoading(true);
                   }
               })
               .catch(err => {
                   console.error("Fetch error:", err);
                   //setLoading(true);
               });
       }
         fetchEvents().then();
    }, [props.start]);

    return (
        <>
            {loading ? <h1 className={"p-4 text-lg"}>Loading events...</h1> : events.length === 0 ? <h1 className={"p-4 text-lg"}>No events today</h1> : <h1 className={"p-4 text-lg"}>Events today:</h1>}
            {!loading && events.map((event) => (
                <div key={event.id} className={"border border-gray-600 w-[80%] m-4 shadow-lg group rounded-lg"}>
                    <div className={"flex bg-blue-500 border-blue-700 rounded-t-lg border-b-4"}>
                        <h1 className={"text-white py-4 text-center text-xl  w-full transition-all duration-300"}>{event.title}</h1>
                        <div
                            className={"w-0 group-hover:w-16 h-20 group-hover:h-20 group-hover:border-l-4 border-blue-700 transition-all duration-300 inline-flex overflow-hidden text-white text-center items-center text-xl"}>
                            <a className={"h-full hover:bg-blue-400"}
                               href={`/dashboard/modify?id=${event.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-10 flex content-center">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={"flex"}>
                        <h2 className={"bg-red-400 text-white w-1/2 py-4 text-center text-xl border-r-4 border-blue-700"}>
                            <div>
                                <h3 className={"text-sm"}>From:</h3>
                                {(event.startTime.getDay() !== event.endTime.getDay() || event.startTime.getMonth() !== event.endTime.getMonth() || event.startTime.getFullYear() !== event.endTime.getFullYear()) && (
                                    <p>{event.startTime.getDate().toString().padStart(2, "0")}.{(event.startTime.getMonth() + 1).toString().padStart(2, "0")}.{event.startTime.getFullYear()}</p>
                                )}
                                <p>{event.startTime.getHours().toString().padStart(2,"0")}:{event.startTime.getMinutes().toString().padStart(2,"0")}</p>
                            </div>
                        </h2>
                        <h2 className={"bg-green-400 text-white w-1/2 py-4 text-center text-xl border-blue-700"}>
                            <div>
                                <h3 className={"text-sm"}>To:</h3>
                                {(event.startTime.getDay() !== event.endTime.getDay() || event.startTime.getMonth() !== event.endTime.getMonth() || event.startTime.getFullYear() !== event.endTime.getFullYear()) && (
                                    <p>{event.endTime.getDate().toString().padStart(2, "0")}.{(event.endTime.getMonth() + 1).toString().padStart(2, "0")}.{event.endTime.getFullYear()}</p>
                                )}
                                <p>{event.endTime.getHours().toString().padStart(2, "0")}:{event.endTime.getMinutes().toString().padStart(2, "0")}</p>
                            </div>
                        </h2>
                    </div>
                    {event.description ?
                        <h2 className={"py-4 text-lg text-center border-t-2 border-gray-600 "}>{event.description}</h2> :
                        <h2 className={"py-4 text-lg text-center border-t-2 text-opacity-40 text-gray-500 border-gray-600 "}> - </h2>
                    }
                        </div>
                        ))}
                </>
            );
            }
