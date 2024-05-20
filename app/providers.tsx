"use client";
import { useState, useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // React Query
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000 * 5,
        },
      },
    });
  });

  // Redux Toolkit
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }

  return (
    <>
      <Provider store={storeRef.current}>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              padding: "16px",
              backgroundColor: "#141414",
              color: "#7e7a71",
            },
          }}
          position="top-center"
        />
        <QueryClientProvider client={queryClient}>
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </Provider>
    </>
  );
};
export default Providers;
