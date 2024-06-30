"use client"

import React from 'react'
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

type Props = Readonly<{
    children: React.ReactNode
}>

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}

export default Providers