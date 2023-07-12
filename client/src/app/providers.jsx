"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThreadsProvider, useThreads, UserProvider, useUser } from "@/context";
import "@fontsource/poppins";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Poppins', sans-serif`,
};
export const theme = extendTheme({ colors, fonts });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      //enabled: false,
    },
  },
});

export function Providers({ children }) {
  return (
    <UserProvider>
      <ThreadsProvider>
        <QueryClientProvider client={queryClient}>
          <CacheProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </CacheProvider>
        </QueryClientProvider>
      </ThreadsProvider>
    </UserProvider>
  );
}
