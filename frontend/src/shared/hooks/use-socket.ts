import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io(import.meta.env.VITE_API_URL);

const events = ['evaluation:created', 'suggestion:created'] as const;
export type EventType = typeof events[number];

export function useSocket<T>(event: EventType, onUpdate: (data: T) => void) {
    useEffect(() => {
        socket.on(event, (data: any) => {
            onUpdate(data);
        });

        return () => {
            socket.off(event);
        };
    }, []);
    return socket;
}
