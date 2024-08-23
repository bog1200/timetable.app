"use server"
import prisma from "@/db";
import {auth} from "@/auth";
import {DateTime} from "luxon";
import {redirect} from "next/navigation";


export async function createEvent(formData:any) {
    const session = await auth();
    const title = formData.get('newTitle');
    const description = formData.get('newDesc');
    const startTime =DateTime.fromISO(formData.get('newStartTime'));
    const endTime = DateTime.fromISO(formData.get('newEndTime'));
    await prisma.event.create({
        data: {
            uid: session!.user!.email,
            title,
            description,
            startTime: startTime.toJSDate(),
            endTime: endTime.toJSDate(),
        }
    });
    return redirect("/dashboard?created=1")
}

export async function deleteEvent(formData?:any) {
    const session = await auth();
    const eventId = formData.get('eventId');
     await prisma.event.delete({
        where: {
            uid: session!.user!.email,
            id: parseInt(eventId)
        }
    });
   return redirect("/dashboard?deleted=1");
}

export async function modifyEvent(formData?: any){
    const session = await auth();
    const eventId = formData.get('eventId');
    const title = formData.get('newTitle');
    const description = formData.get('newDesc');
    const startTime =DateTime.fromISO(formData.get('newStartTime'));
    const endTime = DateTime.fromISO(formData.get('newEndTime'));
    const data = {
        title: title? title : undefined,
        description: description? description : undefined,
        startTime: startTime.toJSDate(),
        endTime: endTime.toJSDate(),
    }
    await prisma.event.update({
        where: {
            uid: session!.user!.email,
            id: parseInt(eventId)
        },
        data: {
            ...data
        }
    });
    return redirect("/dashboard?modified=1");
}