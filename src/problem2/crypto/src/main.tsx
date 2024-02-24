import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import theme from "./assets/theme/theme.ts";
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (typeof query?.meta?.errorMessage === "string") {
                enqueueSnackbar(query.meta.errorMessage, { variant: "error" });
            } else if (error instanceof Error) {
                enqueueSnackbar(error.message, { variant: "error" });
            }
        },
    }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);
