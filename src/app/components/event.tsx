import {PrismaClient} from "@prisma/client";

interface EventProps  {
    id: number;

}
export default async function Event(props: EventProps) {
    const {id} = props;
    const prisma = new PrismaClient();
    const event = await prisma.event.findUnique({
        where: {
            id: id
        }
    });
    if (!event) {
        return <h1>Event not found</h1>
    }
    return (
        <div className={"border-2"}>
            <h1>ID: {event.id}</h1>
            <h1>{event.title}</h1>
            <h2>{event.description}</h2>
        </div>
    )
}