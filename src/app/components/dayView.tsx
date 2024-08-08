import {PrismaClient} from "@prisma/client";


export async function DayView(props: {user: string, start: Date, end: Date}) {
    const prisma = new PrismaClient();
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
            <h1>Day: {props.start.getDate().toString().padStart(2,"0")}.{(props.start.getMonth()+1).toString().padStart(2,"0")}.{props.start.getFullYear()}</h1>
            <h2>User: {props.user}</h2>
            {events.map((event) => {
                return (
                    <div key={event.id} className={"border border-red-600 w-full p-4"}>
                        <h1>ID: {event.id}</h1>
                        <h1>UID: {event.uid}</h1>
                        <h1>{event.startTime.getHours()}:{event.startTime.getMinutes()} - {event.endTime.getHours()}:{event.endTime.getMinutes()}</h1>
                        <h1>{event.title}</h1>
                        <h2>{event.description}</h2>
                    </div>
            )})}
        </>
    )
}