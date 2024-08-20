import Image from "next/image";
import Logout from "@/app/auth/signout/logout";
import {auth} from "@/auth";

export default async function Navbar() {
    const session = await auth();
    return (
        <nav className={"flex m-4 border-b-2 border-black "}>
<div className={"w-fit flex "}>
    {session?.user?.name && session?.user?.image &&  <Image
    src={session?.user?.image}
    alt={session?.user?.name}
    width={72}
    height={72}
    className="rounded-full self-center"
/>}</div>
            <div className={"flex justify-center w-full font-[900] text-3xl "}><a href={"/dashboard"}>Timetable.app</a> </div>
<div className={"flex justify-end w-20"}>  <Logout/></div>



        </nav>

    )
}