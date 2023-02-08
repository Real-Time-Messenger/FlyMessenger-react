import {ChildrenProps} from "../interfaces/ChildrenProps";
import {createContext, FC, useCallback, useContext, useEffect, useState} from "react";
import {dialogsActions} from "../stores/slices/dialogs/dialogs";
import {useActionsCreators, useStateSelector} from "../stores/hooks";
import {userActions} from "../stores/slices/user/user";
import {useTranslation} from "react-i18next";

export enum WebSocketEventType {
    SEND_MESSAGE = "SEND_MESSAGE",
    READ_MESSAGE = "READ_MESSAGE",
    TOGGLE_ONLINE_STATUS = "TOGGLE_ONLINE_STATUS",
    TYPING = "TYPING",
    UNTYPING = "UNTYPING",
    DESTROY_SESSION = "DESTROY_SESSION",
}

export enum WebSocketResponseType {
    RECEIVE_MESSAGE = "RECEIVE_MESSAGE",
    READ_MESSAGE = "READ_MESSAGE",
    TOGGLE_ONLINE_STATUS = "TOGGLE_ONLINE_STATUS",
    TYPING = "TYPING",
    UNTYPING = "UNTYPING",
    USER_BLOCKED = "USER_BLOCKED",
    USER_LOGOUT = "USER_LOGOUT",
    DELETE_DIALOG = "DELETE_DIALOG",
}

interface SocketMessage {
    text?: string;
    file?: {
        name: string;
        size: number;
        type: string;
        data: string;
    }
}

interface WebSocketContext {
    socket: WebSocket | null;
    typing: (dialogId: string, status: boolean) => void | null;
    sendMessage: (dialogId: string, message: SocketMessage) => void | null;
    connect: (callback?: () => void) => void | null;
    destroySession: (sessionId: string) => void | null;
    toggleOnlineStatus: (status: boolean) => void | null;
    readMessage: (dialogId: string, messageId: string) => void | null;
}

const WebSocketContext = createContext<WebSocketContext>({
    socket: null,
    typing: () => null,
    sendMessage: () => null,
    connect: () => null,
    destroySession: () => null,
    toggleOnlineStatus: () => null,
    readMessage: () => null,
});

const WebSocketProvider: FC<ChildrenProps> = ({children}: ChildrenProps) => {
    const {t} = useTranslation();

    const socketContext = useWebSocket()

    const [socket, setSocket] = useState<WebSocket | null>(socketContext.socket);

    const currentUser = useStateSelector((state) => state.user.current);

    const dialogsStore = useActionsCreators(dialogsActions);
    const userStore = useActionsCreators(userActions);

    const url = import.meta.env.VITE_WS_URL;

    const isSocketConnected = (): boolean => socket?.readyState === socket?.OPEN;

    const connect = (callback?: () => void): void => {
        if (!url) return;
        if (socket && isSocketConnected()) {
            socket.close();
        }

        const ws = new WebSocket(url);
        socketContext.socket = setupSocket(ws, callback);
    }

    const setupSocket = (socket: WebSocket, callback?: () => void): WebSocket => {
        socket.onopen = () => {
            if (callback) callback();
        };

        socket.onclose = () => {
            connect(callback);
        };

        socket.onerror = () => {
            connect(callback);
        };

        socket.onmessage = (message) => {
            if (typeof message.data !== "string") return;

            handleSocketMessage(message);
        };

        return socket;
    }

    const handleSocketMessage = (message: MessageEvent): void => {
        const data = JSON.parse(message.data);

        switch (data.type) {
            case WebSocketResponseType.RECEIVE_MESSAGE:
                dialogsStore.addMessage({
                    message: data.message,
                    dialog: data.dialog,
                    currentUserId: currentUser.id,
                });
                if (currentUser.id === data.message.sender.id) break;

                userStore.notify({
                    message: data.message,
                    dialogData: data.dialogData,
                    fileTranslation: t("messages.file").toString()
                });
                break;
            case WebSocketResponseType.READ_MESSAGE:
                dialogsStore.readMessage({
                    dialogId: data.dialogId,
                    messageId: data.messageId
                });
                break;

            case WebSocketResponseType.TOGGLE_ONLINE_STATUS:
                dialogsStore.toggleUserOnline({
                    userId: data.userId,
                    isOnline: data.status,
                    lastActivity: data.lastActivity
                });
                break;

            case WebSocketResponseType.TYPING:
                dialogsStore.toggleTyping({dialogId: data.dialogId, isTyping: true});
                break;

            case WebSocketResponseType.UNTYPING:
                dialogsStore.toggleTyping({dialogId: data.dialogId, isTyping: false});
                break;

            case WebSocketResponseType.USER_BLOCKED:
                dialogsStore.blockUser({userId: data.userId, isBlocked: data.isBlocked})
                break;

            case WebSocketResponseType.USER_LOGOUT:
                if (!data.success && data.sessionId === data.currentSessionId) {
                    // logout();
                    return;
                }

                userStore.setUser({user: data.user});
                break;
            case WebSocketResponseType.DELETE_DIALOG:
                dialogsStore.deleteDialog({dialogId: data.dialogId});
                break;
            default:
                break;
        }
    }

    const typing = (dialogId: string, status: boolean): void => {
        if (!socket) {
            return;
        }

        socket.send(JSON.stringify({
            type: status ? WebSocketEventType.TYPING : WebSocketEventType.UNTYPING,
            dialogId,
        }));
    };

    const sendMessage = (dialogId: string, message: SocketMessage): void => {
        if (!socket) {
            return;
        }

        socket.send(JSON.stringify({
            type: WebSocketEventType.SEND_MESSAGE,
            dialogId,
            ...message,
        }));
    };

    const destroySession = (sessionId: string): void => {
        if (!socket) {
            return;
        }

        socket.send(JSON.stringify({
            type: WebSocketEventType.DESTROY_SESSION,
            sessionId,
        }));
    }

    const toggleOnlineStatus = useCallback((status: boolean): void => {
        if (!socket) {
            return;
        }

        socket.send(JSON.stringify({
            type: WebSocketEventType.TOGGLE_ONLINE_STATUS,
            status,
            userId: currentUser.id
        }));
    }, [socket, currentUser.id])

    const readMessage = (dialogId: string, messageId: string): void => {
        if (!socket) {
            return;
        }

        socket.send(JSON.stringify({
            type: WebSocketEventType.READ_MESSAGE,
            dialogId,
            messageId,
        }));
    }

    useEffect(() => {
        if (!currentUser.id) return;

        connect();
    }, [currentUser.id]);

    useEffect(() => {
        setSocket(socketContext.socket);
    }, [socketContext.socket]);

    const data = {
        socket,
        typing,
        sendMessage,
        connect,
        destroySession,
        toggleOnlineStatus,
        readMessage
    }

    return (
        <WebSocketContext.Provider value={data}>
            {children}
        </WebSocketContext.Provider>
    );
};

const useWebSocket = () => useContext(WebSocketContext);
export {WebSocketProvider, useWebSocket};