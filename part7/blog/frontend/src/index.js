import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotificationContextProvider } from "./NotificationContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "red",
    },
  },
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <Router>
          <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
              light: lightTheme.className,
              dark: darkTheme.className,
            }}
          >
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </NextThemesProvider>
        </Router>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
