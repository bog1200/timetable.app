import Navbar from "@/app/components/Navbar";
import {SessionProvider} from "next-auth/react";

export default async function DashboardLayout({ children }:
    { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Navbar></Navbar>
            {children}
        </SessionProvider>
    );
    }