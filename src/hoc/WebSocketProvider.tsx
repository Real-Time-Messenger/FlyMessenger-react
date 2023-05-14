import React, { createContext, FC, useCallback, useContext, useEffect, useRef } from "react";
import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { settingsActions } from "@/stores/slices/ui/settings/settings";
import { dialogActions } from "@/stores/slices/dialogs/dialogs";
import { searchActions } from "@/stores/slices/search/search";
import { userActions } from "@/stores/slices/user/user";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { useTranslation } from "react-i18next";
import { useOnlineStatus } from "@/hooks";

/**
 * Enum for WebSocket event (client -> server) types.
 *
 * @enum {string}
 */
export enum WebSocketEventType {
    SEND_MESSAGE = "SEND_MESSAGE",
    READ_MESSAGE = "READ_MESSAGE",
    TOGGLE_ONLINE_STATUS = "TOGGLE_ONLINE_STATUS",
    TYPING = "TYPING",
    UNTYPING = "UNTYPING",
    DESTROY_SESSION = "DESTROY_SESSION",
}

/**
 * Enum for WebSocket event (server -> client) types.
 *
 * @enum {string}
 */
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

/**
 * Interface for WebSocket message.
 *
 * @interface SocketMessage
 *
 * @property {string} text - Message text.
 * @property {string} file - Message file.
 */
export interface SocketMessage {
    text?: string;
    file?: {
        name: string;
        size: number;
        type: string;
        data: string;
    };
}

/**
 * Interface for WebSocket context.
 *
 * @interface WebSocketContextValue
 *
 * @property {WebSocket | null} socket - WebSocket instance.
 * @property {() => void} connect - Function for connecting to WebSocket.
 * @property {() => void} disconnect - Function for disconnecting from WebSocket.
 * @property {() => boolean} isSocketConnected - Function for checking if WebSocket is connected.
 * @property {(dialogId: string, message: SocketMessage) => void} sendMessage - Function for sending a message to WebSocket.
 * @property {(dialogId: string, messageId: string) => void} readMessage - Function for sending a read message to WebSocket.
 * @property {(dialogId: string, status: boolean) => void} typing - Function for sending typing status to WebSocket.
 * @property {(status: boolean) => void} toggleOnlineStatus - Function for sending online status to WebSocket.
 * @property {(sessionId: string) => void} destroySession - Function for sending destroy session to WebSocket.
 */
interface WebSocketContextValue {
    socket: WebSocket | null;
    connect: () => void;
    disconnect: () => void;
    isSocketConnected: () => boolean;
    sendMessage: (dialogId: string, recipientId: string, message: SocketMessage) => void;
    readMessage: (dialogId: string, recipientId: string, messageId: string) => void;
    typing: (dialogId: string, recipientId: string, status: boolean) => void;
    toggleOnlineStatus: (status: boolean) => void;
    destroySession: (sessionId: string) => void;
}

/**
 * Context for WebSocket.
 *
 * Used for storing WebSocket instance and functions to reuse it in other components.
 */
export const WebSocketContext = createContext<WebSocketContextValue>({
    socket: null,
    connect: () => {},
    disconnect: () => {},
    isSocketConnected: () => false,
    sendMessage: () => {},
    readMessage: () => {},
    typing: () => {},
    toggleOnlineStatus: () => {},
    destroySession: () => {},
});

/**
 * App provider for WebSocket.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const WebSocketProvider: FC<ChildrenProps> = ({ children }) => {
    const { t } = useTranslation();

    const socketRef = useRef<WebSocket | null>(null);

    const currentUser = useStateSelector((state) => state.user.current);

    const sidebarStore = useActionCreators(sidebarActions);
    const settingsStore = useActionCreators(settingsActions);
    const dialogStore = useActionCreators(dialogActions);
    const searchStore = useActionCreators(searchActions);
    const userStore = useActionCreators(userActions);

    const url = import.meta.env.VITE_WS_URL;

    /**
     * Shorthand function for dropping WebSocket connection and clearing all data in stores.
     */
    const logout = useCallback((): void => {
        searchStore.reset();
        settingsStore.reset();
        sidebarStore.reset();
        dialogStore.reset();

        window.location.reload();
    }, [dialogStore, searchStore, settingsStore, sidebarStore]);

    /**
     * Disconnect from WebSocket.
     */
    const disconnect = (): void => {
        if (!socketRef.current) return;

        socketRef.current.close();
        socketRef.current = null;
    };

    /**
     * Returns the connection status of the WebSocket.
     */
    const isSocketConnected = (): boolean => {
        return socketRef.current !== null && socketRef.current.readyState === WebSocket.OPEN;
    };

    /**
     * Send a message through WebSocket.
     *
     * @param {string} dialogId - Dialog ID.
     * @param {string} recipientId - Recipient ID.
     * @param {SocketMessage} message - Message to send.
     */
    const sendMessage = (dialogId: string, recipientId: string, message: SocketMessage): void => {
        send({
            type: WebSocketEventType.SEND_MESSAGE,
            dialogId,
            recipientId,
            ...message,
        });
    };

    /**
     * Send read message signal through WebSocket.
     *
     * @param {string} dialogId - Dialog ID.
     * @param {string} recipientId - Recipient ID.
     * @param {string} messageId - Message ID.
     */
    const readMessage = (dialogId: string, recipientId: string, messageId: string): void => {
        send({
            type: WebSocketEventType.READ_MESSAGE,
            dialogId,
            messageId,
            recipientId,
        });
    };

    /**
     * Send typing status through WebSocket.
     *
     * @param {string} dialogId - Dialog ID.
     * @param {string} recipientId - Recipient ID.
     * @param {boolean} status - Typing status.
     */
    const typing = (dialogId: string, recipientId: string, status: boolean): void => {
        send({
            type: status ? WebSocketEventType.TYPING : WebSocketEventType.UNTYPING,
            dialogId,
        });
    };

    /**
     * Send a destroyed session message through WebSocket.
     *
     * @param {string} sessionId - Session ID.
     */
    const destroySession = (sessionId: string): void => {
        send({
            type: WebSocketEventType.DESTROY_SESSION,
            sessionId,
        });
    };

    const send = (message: object): void => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            connect(JSON.stringify(message));
            return;
        }

        socketRef.current.send(JSON.stringify(message));
    };

    /**
     * Send online status through WebSocket.
     *
     * @param {status} status - Online status.
     */
    const toggleOnlineStatus = useCallback((status: boolean): void => {
        send({
            type: WebSocketEventType.TOGGLE_ONLINE_STATUS,
            status,
        });
    }, []);

    /**
     * Handle WebSocket message.
     */
    const handleSocketMessage = useCallback(
        (message: string): void => {
            const data = JSON.parse(message);

            console.log(data);

            switch (data.type) {
                case WebSocketResponseType.RECEIVE_MESSAGE:
                    dialogStore.addMessage({
                        message: data.message,
                        dialog: data.dialog,
                    });

                    if (currentUser.id === data.message.sender.id) break;
                    userStore.notify({
                        message: data.message,
                        dialogData: data.dialogData,
                        fileTranslation: t("messages.file").toString(),
                    });
                    break;
                case WebSocketResponseType.READ_MESSAGE:
                    dialogStore.readMessage({
                        dialogId: data.dialogId,
                        messageId: data.messageId,
                    });
                    break;

                case WebSocketResponseType.TOGGLE_ONLINE_STATUS:
                    dialogStore.toggleUserOnline({
                        userId: data.userId,
                        isOnline: data.status,
                        lastActivity: data.lastActivity,
                    });
                    break;

                case WebSocketResponseType.TYPING:
                    dialogStore.toggleTyping({ dialogId: data.dialogId, isTyping: true });
                    break;

                case WebSocketResponseType.UNTYPING:
                    dialogStore.toggleTyping({ dialogId: data.dialogId, isTyping: false });
                    break;

                case WebSocketResponseType.USER_BLOCKED:
                    dialogStore.blockUser({ userId: data.userId, isBlocked: data.isBlocked });
                    break;

                case WebSocketResponseType.USER_LOGOUT:
                    if (!data.success && data.sessionId === data.currentSessionId) {
                        logout();
                        return;
                    }

                    userStore.removeSession({ sessionId: data.sessionId });
                    break;
                case WebSocketResponseType.DELETE_DIALOG:
                    dialogStore.deleteDialog({ dialogId: data.dialogId });
                    break;
                case WebSocketResponseType.DELETE_USER:
                    logout();
                    break;
            }
        },
        [currentUser.id, dialogStore, logout, t, userStore],
    );

    /**
     * Connect to WebSocket.
     *
     * @param {() => void} callback - Callback function.
     */
    const connect = useCallback(
        (callback?: string): void => {
            if (socketRef.current || !url) return;

            socketRef.current = new WebSocket(url);

            socketRef.current.onopen = () => {
                if (callback) socketRef.current?.send(callback);

                toggleOnlineStatus(true);
            };

            socketRef.current.onclose = () => {
                if (window.location.pathname !== "/m") return;

                connect();
            };

            socketRef.current.onerror = () => {
                if (window.location.pathname !== "/m") return;

                connect();
            };

            socketRef.current.onmessage = (event) => {
                handleSocketMessage(event.data);
            };
        },
        [handleSocketMessage, toggleOnlineStatus, url],
    );

    useOnlineStatus({
        onHide: () => toggleOnlineStatus(false),
        onShow: () => toggleOnlineStatus(true),
    });

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, [connect]);

    return (
        <WebSocketContext.Provider
            value={{
                socket: socketRef.current,
                connect,
                disconnect,
                isSocketConnected,
                sendMessage,
                readMessage,
                typing,
                toggleOnlineStatus,
                destroySession,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
