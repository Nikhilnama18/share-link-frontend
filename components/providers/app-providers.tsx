"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/providers/auth-provider";

/** AppProviders centralizes cross-cutting client providers for theming and UI libraries. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ChakraProvider value={defaultSystem}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}
