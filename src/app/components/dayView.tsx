"use client"
import { deleteEvent } from "@/app/actions/events";
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
         fetchEvents();
    }, [props.start]);

    return (
        <>
            {loading ? <h1 className={"p-4 text-lg"}>Loading events...</h1> : events.length === 0 ? <h1 className={"p-4 text-lg"}>No events today</h1> : <h1 className={"p-4 text-lg"}>Events today:</h1>}
            {!loading && events.map((event) => (
                <div key={event.id} className={"border border-gray-600 w-[80%] m-4 shadow-lg group rounded-lg"}>
                    <h1 className={"bg-blue-500 text-white py-4 text-center text-xl border-b-4 border-blue-700 rounded-t-lg"}>{event.title}</h1>
                    <div
                        className={"w-full h-0 group-hover:h-20 transition-all duration-300 group-hover:md:delay-1000 delay-150 flex overflow-hidden bg-sky-400 text-white text-center items-center text-xl"}>
                        <button className={"w-1/2 h-full hover:bg-blue-400"}>Modify</button>
                        <form action={deleteEvent}>
                            <input type={"hidden"} name={"eventId"} value={event.id}/>
                            <button type={"submit"} className={"w-1/2 h-full hover:bg-blue-400"}>Delete</button>
                        </form>
                    </div>
                    <div className={"flex"}>
                        <h2 className={"bg-red-400 text-white w-1/2 py-4 text-center text-xl border-r-4 border-blue-700"}>
                            <div>
                                <h3 className={"text-sm"}>From:</h3>
                                {(event.startTime.getDay() !== event.endTime.getDay() || event.startTime.getMonth() !== event.endTime.getMonth() || event.startTime.getFullYear() !== event.endTime.getFullYear()) && (
                                    <p>{event.startTime.getDate().toString().padStart(2, "0")}.{(event.startTime.getMonth() + 1).toString().padStart(2, "0")}.{event.startTime.getFullYear()}</p>
                                )}
                                <p>{event.startTime.getHours()}:{event.startTime.getMinutes()}</p>
                            </div>
                        </h2>
                        <h2 className={"bg-green-400 text-white w-1/2 py-4 text-center text-xl border-blue-700"}>
                            <div>
                                <h3 className={"text-sm"}>To:</h3>
                                {(event.startTime.getDay() !== event.endTime.getDay() || event.startTime.getMonth() !== event.endTime.getMonth() || event.startTime.getFullYear() !== event.endTime.getFullYear()) && (
                                    <p>{event.endTime.getDate().toString().padStart(2, "0")}.{(event.endTime.getMonth() + 1).toString().padStart(2, "0")}.{event.endTime.getFullYear()}</p>
                                )}
                                <p>{event.endTime.getHours()}:{event.endTime.getMinutes()}</p>
                            </div>
                        </h2>
                    </div>
                    <h2 className={"py-4 text-lg text-center border-t-2 border-gray-600 "}>{event.description}</h2>
                </div>
            ))}
        </>
    );
}
