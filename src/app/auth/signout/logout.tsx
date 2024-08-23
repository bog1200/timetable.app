"use client";
import { doLogout } from "@/app/actions"

const Logout = () => {
    function handleLogout() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
        }
    }



    return (
        <form action={doLogout} onSubmit={handleLogout}>
            <button className="bg-blue-400 my-2 w-full text-white p-1 rounded" type="submit">Logout</button>
        </form>
    )
}

export default Logout