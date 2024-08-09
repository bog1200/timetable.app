import Navbar from "@/app/components/Navbar";

export default async function DashboardLayout({ children }:
    { children: React.ReactNode }) {
    return (
        <>
            <Navbar></Navbar>
            {children}
        </>
    );
    }