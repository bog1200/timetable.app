import Navbar from "@/app/components/Navbar";
import {SessionProvider} from "next-auth/react";
import Head from "next/head";
export const metadata = {
    manifest: '/manifest.json',
};
export default async function DashboardLayout({ children }:
    { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Navbar></Navbar>
            <main className={"mt-28"}>
                {children}
            </main>

        </SessionProvider>
    );
    }