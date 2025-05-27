import { useEffect } from "react";
import { useSocketContext } from "@/lib/socket.io";

const events = ['evaluation:created', 'suggestion:created'] as const;
export type EventType = typeof events[number];

export function useSocket<T>(event: EventType, onUpdate: (data: T) => void) {
    const socket = useSocketContext();

    useEffect(() => {
        const handler = (data: any) => {
            onUpdate(data);
        };

        socket.on(event, handler);

        return () => {
            socket.off(event, handler); // remove só esse listener
        };
    }, [event, onUpdate, socket]);

    return socket;
}
