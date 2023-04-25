import { IDialog, LastMessageInDialog } from "@/entities/dialog/IDialog";
import classNames from "classnames";
import { AnchorIcon, CheckIcon, DoubleCheckIcon } from "@/components/icons";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { searchActions } from "@/stores/slices/search/search";
import { useWebSocket } from "@/hoc/WebSocketProvider";
import { DialogContextMenu } from "@/components/ui/messenger/dialog/DialogContextMenu";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { concatenate, parseDateToTime } from "@/helpers/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { dialogActions } from "@/stores/slices/dialogs/dialogs";
import {sidebarActions} from "@/stores/slices/ui/sidebar/sidebar";

/**
 * Interface of X, Y coordinates.
 *
 * @property {number} x - The X coordinate.
 * @property {number} y - The Y coordinate.
 */
export interface PositionProps {
    x: number;
    y: number;
}

/**
 * Interface for `ReadStatusIcon` component.
 *
 * @extends {LastMessageInDialog}
 *
 * @property {boolean} isActive - The flag that indicates whether the dialog is active.
 * @property {string} userId - The user ID.
 */
interface ReadStatusIconProps extends LastMessageInDialog {
    isActive: boolean;
    userId: string;
}

/**
 * The component that renders the read status icon.
 *
 * Single check icon is rendered if the message is not read.
 * Double check icon is rendered if the message is read.
 */
export const ReadStatusIcon: FC<ReadStatusIconProps> = ({ lastMessage, isActive, userId }) => {
    if (!lastMessage || lastMessage.sender.id === userId) return null;

    const classes = classNames(
        "w-4 h-4 stroke-0",
        lastMessage?.isRead && !isActive ? "fill-[#5B9BD9] dark:fill-[#5B9BD9]" : "fill-[#4C4C4C] dark:fill-[#FFFFFF]",
        !lastMessage?.isRead && "-mr-0.5",
    );

    return lastMessage.isRead ? <DoubleCheckIcon className={classes} /> : <CheckIcon className={classes} />;
};

/**
 * Renders the dialog item.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DialogItem: FC<IDialog> = ({ id, user, lastMessage, isMeBlocked, ...props }) => {
    const { t } = useTranslation();

    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialogId = useStateSelector((state) => state.dialogs.activeDialog?.id);
    const activeDialog = dialogs.find((dialog) => dialog.id === activeDialogId);

    const sidebarStore = useActionCreators(sidebarActions);
    const searchStore = useActionCreators(searchActions);
    const dialogStore = useActionCreators(dialogActions);

    const contextMenuRef = useRef<HTMLDivElement>(null);

    const { typing } = useWebSocket();

    const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<PositionProps>({ x: 0, y: 0 });

    const isActive = activeDialog?.id === id;

    const classes = classNames(
        "group w-full p-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2.5 overflow-hidden select-none",
        isActive || isContextMenuOpen
            ? "bg-[#98BDE7] dark:bg-[#416D9C]"
            : "bg-[#EAEDFA] hover:bg-[#CAD5F2] dark:bg-[#1F2B49] dark:hover:bg-[#416D9C50]",
    );

    /**
     * Handles the dialog item click.
     */
    const handleClick = (): void => {
        sidebarStore.toggleMobileSidebar(false);
        searchStore.reset();

        if (id === activeDialog?.id) return;

        dialogStore.setActiveDialog({ id });
        searchStore.setSearchableMessageId(null);

        if (activeDialog?.id) typing(activeDialog.id, false);

        const inputTextarea = document.getElementById("message-footer__textarea");
        if (inputTextarea) inputTextarea.focus();
    };

    /**
     * Toggles last message content to "File" (if it's a file) or "Text" (if it's a text).
     *
     * @returns {string | null} - The last message content.
     */
    const parseLastMessage = (): string | null => {
        if (!lastMessage) return null;

        if (lastMessage.text) return lastMessage.text;
        if (lastMessage.file) return t("messages.file");

        return null;
    };

    /**
     * Handles the context menu opening.
     *
     * @param {MouseEvent} event - The event to get the X and Y coordinates.
     */
    const handleContextMenu = useCallback((event: MouseEvent): void => {
        event.preventDefault();

        if (!contextMenuRef.current === null || !contextMenuRef.current?.contains(event.target as Node)) return;

        setIsContextMenuOpen(true);

        setContextMenuPosition({
            x: event.clientX,
            y: event.clientY,
        });
    }, []);

    /**
     * Add event listeners to the `document` to handle the context menu opening.
     */
    useEffect((): (() => void) => {
        window.addEventListener("contextmenu", handleContextMenu);

        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [handleContextMenu]);

    return (
        <>
            <DialogContextMenu
                isOpened={isContextMenuOpen}
                position={contextMenuPosition}
                onClose={() => setIsContextMenuOpen(false)}
                user={user}
                dialog={{
                    id,
                    isPinned: props.isPinned,
                    isSoundEnabled: props.isSoundEnabled,
                    isNotificationsEnabled: props.isNotificationsEnabled,
                }}
            />

            <div onClick={handleClick} className={classes} ref={contextMenuRef}>
                <div className="relative flex h-full min-h-[48px] w-min min-w-[48px] items-center justify-center">
                    <Avatar
                        src={user.photoURL}
                        alt={concatenate(user.firstName, user.lastName)}
                        className="h-[48px] w-[48px] rounded-full"
                    />

                    <AnimatePresence>
                        {user.isOnline && !isMeBlocked && !user.isBlocked && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className={classNames(
                                    "absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full ring-2 transition",
                                    isActive
                                        ? "bg-[#FFFFFF] ring-[#98BDE7] dark:bg-[#FFFFFF] dark:ring-[#416D9C]"
                                        : "bg-[#5B9BD9] ring-[#EAEDFA] group-hover:ring-[#CAD5F2] dark:bg-[#5B9BD9] dark:ring-[#1F2B49] dark:group-hover:ring-[#223757]",
                                )}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-1 flex-col gap-1 overflow-hidden transition-none">
                    <div className="flex items-center justify-between gap-2 truncate">
                        <span className="truncate dark:text-[#FFFFFF]">
                            {concatenate(user.firstName, user.lastName)}
                        </span>

                        <div className="flex flex-auto items-start justify-end gap-1">
                            <ReadStatusIcon lastMessage={lastMessage} isActive={isActive} userId={user.id} />

                            <span
                                className={classNames(
                                    "text-[13px]",
                                    isActive
                                        ? "text-[#303030] dark:text-[#FFFFFF]"
                                        : "text-[#4C4C4C] dark:text-[#AFAFAF]",
                                )}
                            >
                                {lastMessage && parseDateToTime(lastMessage.sentAt)}
                            </span>

                            {props.isPinned && (
                                <AnchorIcon
                                    className={classNames(
                                        "h-4 w-4 stroke-[1.5]",
                                        isActive
                                            ? "text-[#303030] dark:text-[#FFFFFF]"
                                            : "text-[#4C4C4C] dark:text-[#AFAFAF]",
                                    )}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex">
                        <span
                            className={classNames(
                                "h-10 flex-1 break-all text-sm line-clamp-2",
                                isActive || isContextMenuOpen
                                    ? "text-[#303030] dark:text-[#FFFFFF]"
                                    : "text-[#4C4C4C] dark:text-[#AFAFAF]",
                            )}
                        >
                            {user.isTyping && user.isOnline ? (
                                <span
                                    className={classNames(
                                        isActive
                                            ? "text-[#303030] dark:text-[#FFFFFF]"
                                            : "text-[#4C4C4C] dark:text-[#AFAFAF]",
                                    )}
                                >
                                    {t("users.status.typing")}
                                </span>
                            ) : lastMessage ? (
                                parseLastMessage()
                            ) : (
                                t("messages.first")
                            )}
                        </span>

                        {props.unreadMessages > 0 && (
                            <div className="my-auto ml-2 flex max-w-[60px] items-center justify-center gap-1 rounded-full bg-[#5B9BD9] px-1.5 py-0.5 text-xs text-[#EAEDFA] dark:bg-[#5B9BD975] dark:text-[#F5F5F5]">
                                <span className="truncate">{props.unreadMessages}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
