"use client";

// eslint-disable-next-line import/no-extraneous-dependencies

import {SessionProvider} from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default Providers;
