import React from "react";
import type {Metadata} from "next";
import {ThemeProvider} from "@mui/material/styles";
import theme from "@/theme";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import {Toaster} from "react-hot-toast";

import "./globals.css";


export const metadata: Metadata = {
    title: "DPlayer",
    description: "Created Using NextJs, Redux, SpringBoot, MongoDB, Mongo",
    icons: {
        icon: '/favicon-darkfill.ico',
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="antialiased">
        {/*<Providers>*/}
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Toaster
                    position={"top-right"}
                    reverseOrder={true}
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: "rgba(0,0,0,0.58)",
                            color: "rgba(255,255,255,0.69)"
                        },
                        success: {
                            duration: 2500,
                        },
                    }}
                />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        {/*</Providers>*/}
        </body>
        </html>
    );
}
