"use server"
import prisma from "@/db";
import {auth} from "@/auth";
import {DateTime} from "luxon";

export async function createEvent(formData:any) {
    const session = await auth();
    const title = formData.get('newTitle');
    const description = formData.get('newDesc');
    const startTime =DateTime.fromISO(formData.get('newStartTime'));
    const endTime = DateTime.fromISO(formData.get('newEndTime'));
    return prisma.event.create({
        data: {
            uid: session!.user!.email,
            title,
            description,
            startTime: startTime.toJSDate(),
            endTime: endTime.toJSDate(),
        }
    });
}

export async function deleteEvent(formData?:any) {
    const session = await auth();
    const eventId = formData.get('eventId');
    return prisma.event.delete({
        where: {
            uid: session!.user!.email,
            id: parseInt(eventId)
        }
    });
}