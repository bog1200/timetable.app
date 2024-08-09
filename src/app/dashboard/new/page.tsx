export default function CreateEvent() {
    return (
        <div className={"m-4 "}>
            <h1 className={"text-3xl capitalize"}>New event:</h1>
            <form className={"space-y-2 flex flex-col mt-8"}>
                <label htmlFor={"title"}>
                    Title
                </label>
                <input type={"text"} id={"title"} name={"newTitle"}/>
                <br/>
                <label htmlFor={"desc"}>
                    Description
                </label>

                <textarea id={"desc"} name={"newDesc"}></textarea>
                <br/>
                <label htmlFor={"date"} className={"w-full"}>
                    Date
                </label>
                <input type={"date"} id={"date"} name={"newDate"}></input>
                <br/>
                <label htmlFor={"startTime"}>
                    Start Time
                </label>
                <input type={"time"} id={"startTime"} name={"newStartTime"}></input>
                <br/>
                <label htmlFor={"endTime"}>
                    End Time
                </label>
                <input type={"time"} id={"endTime"} name={"newEndTime"}></input>
                <input type={"hidden"} name={"userId"}></input>
                <br/>
                <button type={"submit"} className={"p-4 bg-green-500 text-white rounded-lg"}>Add Event</button>

            </form>
        </div>
    )
}