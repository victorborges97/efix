// src/context/SocketContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type EventBuffer = { event: string; data: any }[];

const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef(socket);

  const eventBuffer = useRef<EventBuffer>([]);

  useEffect(() => {
    const currentSocket = socketRef.current;

    const flushBuffer = () => {
      console.log("🔁 Reenviando eventos offline:", eventBuffer.current);
      eventBuffer.current.forEach(({ event, data }) => {
        currentSocket.emit(event, data);
      });
      eventBuffer.current = [];
    };

    currentSocket.connect();

    currentSocket.on("connect", () => {
      console.log("🚀 Conectado ao Socket.IO");
      flushBuffer();
    });

    currentSocket.on("connect_error", (e) => {
      console.log("🚀 Error ao conectar Socket.IO");
      if (socket.active) {
        console.warn(
          "temporary failure, the socket will automatically try to reconnect"
        );
        console.log(JSON.stringify(e, null, 2));
      } else {
        // the connection was denied by the server
        // in that case, `socket.connect()` must be manually called in order to reconnect
        console.log(e.message);
      }
    });

    currentSocket.on("disconnect", (reason) => {
      console.warn("⚠️ Desconectado:", reason);
    });

    return () => {
      currentSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
