import {ChildrenProps} from "../interfaces/ChildrenProps";
import {createContext, FC, useCallback, useContext, useEffect, useState} from "react";
import {dialogsActions} from "../stores/slices/dialogs/dialogs";
import {useActionsCreators} from "../stores/hooks";
import {userActions} from "../stores/slices/user/user";
import {useTranslation} from "react-i18next";
import {sidebarActions} from "../stores/slices/ui/sidebar/sidebar";
import {settingsActions} from "../stores/slices/ui/settings/settings";
import {searchActions} from "../stores/slices/search/search";

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
    DELETE_USER = "DELETE_USER",
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
    typing: (dialogId: string, status: boolean) => void;
    sendMessage: (dialogId: string, message: SocketMessage) => void;
    connect: (callback?: () => void) => void;
    destroySession: (sessionId: string) => void;
    toggleOnlineStatus: (status: boolean) => void;
    readMessage: (dialogId: string, messageId: string) => void;
    isSocketConnected: () => boolean;
}

export const WebSocketContext = createContext<WebSocketContext>({
    socket: null,
    typing: () => null,
    sendMessage: () => null,
    connect: () => null,
    destroySession: () => null,
    toggleOnlineStatus: () => null,
    readMessage: () => null,
    isSocketConnected: () => false,
});

const WebSocketProvider: FC<ChildrenProps> = ({children}: ChildrenProps) => {
    const {t} = useTranslation();

    const socketContext = useWebSocket()

    const [socket, setSocket] = useState<WebSocket | null>(socketContext.socket);

    const sidebarStore = useActionsCreators(sidebarActions);
    const settingsStore = useActionsCreators(settingsActions);
    const dialogsStore = useActionsCreators(dialogsActions);
    const searchStore = useActionsCreators(searchActions);
    const userStore = useActionsCreators(userActions);

    const url = import.meta.env.VITE_WS_URL;

    const isSocketConnected = useCallback(() => socket && socket.readyState === socket.OPEN || false, [socket]);

    const logout = useCallback(() => {
        searchStore.reset();
        settingsStore.reset();
        sidebarStore.reset();
        dialogsStore.reset();

        window.location.reload();
    }, []);

    const setupSocket = (socket: WebSocket, callback?: () => void): WebSocket => {
        socket.onopen = () => {
            if (callback) callback();

            setTimeout(() => toggleOnlineStatus(true), 1000);
        };

        socket.onclose = () => {
            connect(callback);
        };

        socket.onerror = () => {
            // connect(callback);
        };

        socket.onmessage = (message) => {
            if (typeof message.data !== "string") return;

            handleSocketMessage(message);
        };

        return socket;
    }

    const handleSocketMessage = (message: MessageEvent): void => {
        const data = JSON.parse(message.data);

        console.log(data)

        switch (data.type) {
            case WebSocketResponseType.RECEIVE_MESSAGE:
                dialogsStore.addMessage({
                    message: data.message,
                    dialog: data.dialog,
                });
                if (data.userId === data.message.sender.id) break;

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
                    logout();
                    return;
                }

                userStore.removeSession({sessionId: data.sessionId});
                break;
            case WebSocketResponseType.DELETE_DIALOG:
                dialogsStore.deleteDialog({dialogId: data.dialogId});
                break;
            case WebSocketResponseType.DELETE_USER:
                logout();
                break;
            default:
                break;
        }
    }

    const typing = useCallback((dialogId: string, status: boolean): void => {
        if (!socket) return;

        socket.send(JSON.stringify({
            type: status ? WebSocketEventType.TYPING : WebSocketEventType.UNTYPING,
            dialogId,
        }));
    }, [socket]);

    const sendMessage = (dialogId: string, message: SocketMessage): void => {
        console.log(socket)

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

    const toggleOnlineStatus = (status: boolean): void => {
        if (socketContext.socket && isSocketConnected()) {
            socketContext.socket.send(JSON.stringify({
                type: WebSocketEventType.TOGGLE_ONLINE_STATUS,
                status,
            }));
            return;
        }

        if (socket && isSocketConnected()) {
            socket.send(JSON.stringify({
                type: WebSocketEventType.TOGGLE_ONLINE_STATUS,
                status,
            }));
            return;
        }
    }

    const readMessage = (dialogId: string, messageId: string): void => {
        if (!socket) return;

        socket.send(JSON.stringify({
            type: WebSocketEventType.READ_MESSAGE,
            dialogId,
            messageId,
        }));
    }

    const connect = (callback?: () => void): void => {
        if (!url) return;

        socketContext.socket = setupSocket(new WebSocket(url), callback);

        setSocket(socketContext.socket);
    }

    useEffect(() => {
        if (socketContext.socket) setSocket(socketContext.socket);
    }, [socketContext.socket]);

    useEffect(() => {
        if (isSocketConnected()) return;

        connect();

        return () => {
            if (socket) {
                socket.close();
            }

            if (socketContext.socket) {
                socketContext.socket.close();
                socketContext.socket = null;
            }
        }
    }, []);

    const data = {
        socket,
        typing,
        sendMessage,
        connect,
        destroySession,
        toggleOnlineStatus,
        readMessage,
        isSocketConnected
    }

    useEffect(() => {
        socketContext.socket = socket
        socketContext.typing = typing
        socketContext.sendMessage = sendMessage
        socketContext.connect = connect
        socketContext.destroySession = destroySession
        socketContext.toggleOnlineStatus = toggleOnlineStatus
        socketContext.readMessage = readMessage
        socketContext.isSocketConnected = isSocketConnected

        return () => {
            socketContext.socket = null
            socketContext.typing = () => {
            }
            socketContext.sendMessage = () => {
            }
            socketContext.connect = () => {
            }
            socketContext.destroySession = () => {
            }
            socketContext.toggleOnlineStatus = () => {
            }
            socketContext.readMessage = () => {
            }
            socketContext.isSocketConnected = () => false
        }
    }, [socket, typing, sendMessage, connect, destroySession, toggleOnlineStatus, readMessage, isSocketConnected]);

    return (
        <WebSocketContext.Provider value={{...data}}>
            {children}
        </WebSocketContext.Provider>
    );
};

const useWebSocket = () => useContext(WebSocketContext);
export {WebSocketProvider, useWebSocket};