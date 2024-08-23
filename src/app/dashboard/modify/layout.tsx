import {Suspense} from "react";

export default async function ModifyLayout({ children }:
    { children: React.ReactNode }) {
    return (
       <Suspense>
           {children}
       </Suspense>
    );
}