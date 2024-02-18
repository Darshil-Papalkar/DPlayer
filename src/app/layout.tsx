import React from "react";
import type {Metadata} from "next";
import {inter} from "@/app/ui/font";
import Providers from "@/app/redux/Provider";
import {ThemeProvider} from "@mui/material/styles";
import theme from "@/theme";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";

import "./globals.css";


export const metadata: Metadata = {
    title: "DPlayer",
    description: "Created Using NextJs, Redux, SpringBoot, MongoDB, Mongo",
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
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
                {/*</Providers>*/}
            </body>
        </html>
    );
}
