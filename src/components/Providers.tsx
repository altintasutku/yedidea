"use client";

import React, { useMemo, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default Providers;
