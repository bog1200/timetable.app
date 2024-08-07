"use client";
import {SessionProvider} from "next-auth/react";

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default LoginProvider;
