import prisma  from "@/db";


export async function WeekView(props: {user: string, start: Date, end: Date}) {
    const events = await prisma.event.findMany({
        where: {
            uid: {equals: props.user},
            startTime: {gte: props.start, lte: props.end},
            endTime: {gte: props.start, lte: props.end}

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
            <div className={"grid grid-cols-7 grid-rows-[24] gap-4 bg-red-500 border-4 w-full h-screen "}>
                <div className={"col-start-1  row-start-6 row-span-2"}>Test</div>
            </div>

        </>
    )
}