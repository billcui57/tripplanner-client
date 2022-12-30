import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A9D8F",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
