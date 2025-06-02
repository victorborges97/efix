//@ts-ignore
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./routes.tsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./lib/socket.io.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <SocketProvider>
      <AppRoutes />
    </SocketProvider>
  </BrowserRouter>
  // </StrictMode>
);
