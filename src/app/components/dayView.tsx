import prisma  from "@/db";


export async function DayView(props: {user: string, start: Date, end: Date}) {
    const events = await prisma.event.findMany({
        where: {
            uid: {equals: props.user},
            startTime: {gte: props.start},
            endTime: {lte: props.end}
        },
        orderBy: {
            startTime: 'asc'
        }
    });

    return (
        <>
            {events.length === 0 && <h1 className={"p-4 text-lg"}>No events today</h1>}
            {events.length > 0 && <h1 className={"p-4 text-lg"}>Events today:</h1>}
            <a href={"/dashboard/new"} className={"w-[80%] bg-green-500 text-white h-20 rounded-full my-5 text-2xl py-5 text-center"}>New Event</a>
            {events.map((event) => {
                return (
                    <div key={event.id} className={"border border-gray-600 w-[80%] m-4 shadow-lg group rounded-lg"}>
                        <h1 className={"bg-blue-500 text-white py-4 text-center text-xl border-b-4 border-blue-700 rounded-t-lg"}>{event.title}</h1>
                        <div
                            className={"w-full h-0 group-hover:h-20 transition-all duration-300 group-hover:md:delay-1000 delay-150 flex overflow-hidden bg-sky-400 text-white text-center items-center text-xl"}>
                            <button className={"w-1/2 h-full hover:bg-blue-400"}>Modify</button>
                            <button className={"w-1/2 h-full hover:bg-blue-400"}>Delete</button>
                        </div>
                        <div className={"flex"}>
                            <h2 className={"bg-red-400 text-white w-1/2 py-4 text-center text-xl border-r-4 border-blue-700"}>
                                <div>
                                    <h3 className={"text-sm"}>From:</h3>
                                    <p>{event.startTime.getHours()}:{event.startTime.getMinutes()}</p>
                                </div>
                            </h2>
                            <h2 className={"bg-green-400 text-white w-1/2 py-4 text-center text-xl border-blue-700"}>
                                <div>
                                    <h3 className={"text-sm"}>To:</h3>
                                    <p>{event.endTime.getHours()}:{event.endTime.getMinutes()}</p>
                                </div>
                            </h2>
                        </div>
                        <h2 className={"py-4 text-lg text-center border-t-2 border-gray-600 "}>{event.description}</h2>
                        {/*<button className={"w-full bg-green-500 text-white h-10"}>DONE</button>*/}
                    </div>
                )
            })}
        </>
    )
}