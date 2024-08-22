"use client";
import {createEvent} from "@/app/actions/events";
import {scheduleNotification} from "@/app/actions/notifications";
import {DateTime} from "luxon";

export default function CreateEvent() {
    return (
        <div className={"m-4"}>
            <h1 className={"text-3xl capitalize"}>New event:</h1>
            <form className={"space-y-2 mt-8 m-4"}  action={async (formData) => {
                //convert startTime to UTC
                formData.set("newStartTime",DateTime.fromISO(formData.get('newStartTime') as string).toUTC().toString());
                formData.set("newEndTime",DateTime.fromISO(formData.get('newEndTime') as string).toUTC().toString());
                await createEvent(formData);
                window.alert("Event created");
                await scheduleNotification(formData.get('newTitle') as string, formData.get('newStartTime') as string);
                window.location.reload();
            }}>
                <div >
                    <label htmlFor={"title"} className={"block"}>
                        Title
                    </label>
                    <input type={"text"} id={"title"} name={"newTitle"} className={"border-2 p-4 shadow-lg rounded-lg w-full"} required={true}/>
                </div>
                <div >
                    <label htmlFor={"desc"}>
                        Description
                    </label>

                    <textarea id={"desc"} name={"newDesc"} className={"border-2 p-4 shadow-lg rounded-lg w-full"}></textarea>
                </div>
                <div>
                    <label htmlFor={"startTime"}>
                        Start Time
                    </label>
                    <input type={"datetime-local"} id={"startTime"} name={"newStartTime"}
                           className={"border-2 p-4 shadow-lg rounded-lg w-full"} required={true}></input>
                </div>
                <div>
                    <label htmlFor={"endTime"}>
                        End Time
                    </label>
                    <input type={"datetime-local"} id={"endTime"} name={"newEndTime"} className={"border-2 p-4 shadow-lg rounded-lg w-full"} required={true}></input>
                </div>
                <div className={"flex justify-center py-8"}>

                <button type={"submit"} className={"p-4 bg-green-500 text-white rounded-lg w-1/2"}>Add Event</button>
                </div>

            </form>
        </div>
    )
}