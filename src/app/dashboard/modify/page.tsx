"use client";
import {deleteEvent, modifyEvent} from "@/app/actions/events";
import {scheduleNotification} from "@/app/actions/notifications";
import {DateTime} from "luxon";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Event} from "@/definitions";

export default function ModifyEvent() {
    const query = useSearchParams();
    const eventId = query.get('id');

    const [event, setEvent] = useState<Event>();


    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch(`/api/events/getEvent?id=${eventId}`);
            const data = await response.json();
            const parsedEvent = {
                ...data.event,
                startTime: new Date(data.event.startTime),
                endTime: new Date(data.event.endTime),
            };
            setEvent(parsedEvent);
        }

        fetchEvent().then();

    }, [eventId]);
    return (
        <div className={"m-4"}>
            <h1 className={"text-3xl capitalize"}>Modify event:</h1>
            {!event ? <h1>Loading event...</h1> : <>
                <form className={"space-y-2 mt-8 m-4"} action={async (formData) => {
                    //convert startTime to UTC
                    formData.set("newStartTime", DateTime.fromISO(formData.get('newStartTime') as string).toUTC().toString());
                    formData.set("newEndTime", DateTime.fromISO(formData.get('newEndTime') as string).toUTC().toString());
                    await modifyEvent(formData);
                    window.alert("Event modified");
                    await scheduleNotification(formData.get('newTitle') as string, formData.get('newStartTime') as string);
                    window.location.reload();
                }}>
                    <div>
                        <label htmlFor={"title"} className={"block"}>
                            Title (current value: {event.title})
                        </label>
                        <input type={"text"} id={"title"} name={"newTitle"} placeholder={event.title}
                               className={"border-2 p-4 shadow-lg rounded-lg w-full"}/>
                    </div>
                    <div>
                        <label htmlFor={"desc"}>
                            Description (current value: {event.description})
                        </label>

                        <textarea id={"desc"} name={"newDesc"} placeholder={event.description}
                                  className={"border-2 p-4 shadow-lg rounded-lg w-full"}></textarea>
                    </div>
                    <div>
                        <label htmlFor={"startTime"}>
                            Start Time (current
                            value: {DateTime.fromJSDate(event.startTime).toLocal().toFormat("yyyy-MM-dd HH:mm")})
                        </label>
                        <input type={"datetime-local"} id={"startTime"} name={"newStartTime"}
                               className={"border-2 p-4 shadow-lg rounded-lg w-full"}
                               value={DateTime.fromJSDate(event.startTime).toLocal().toFormat("yyyy-MM-dd'T'HH:mm")}
                               required={true}></input>
                    </div>
                    <div>
                        <label htmlFor={"endTime"}>
                            End Time (current
                            value: {DateTime.fromJSDate(event.endTime).toLocal().toFormat("yyyy-MM-dd HH:mm")})
                        </label>
                        <input type={"datetime-local"} id={"endTime"} name={"newEndTime"}
                               value={DateTime.fromJSDate(event.endTime).toLocal().toFormat("yyyy-MM-dd'T'HH:mm")}
                               className={"border-2 p-4 shadow-lg rounded-lg w-full"} required={true}></input>
                    </div>
                    <div className={"flex justify-center py-8"}>
                        <input type={"hidden"} name={"eventId"} value={event.id}/>

                        <button type={"submit"} className={"p-4 bg-green-500 text-white rounded-lg w-1/2"}>Modify
                            Event
                        </button>
                    </div>

                </form>
                <div className={"flex justify-center py-8"}>
                    <form action={deleteEvent}>
                        <input type={"hidden"} name={"eventId"} value={event.id}/>
                        <button type={"submit"} className={"p-4 bg-red-500 text-white rounded-lg"}>Delete Event</button>
                    </form>
                </div>
        </>
}
</div>
)
}