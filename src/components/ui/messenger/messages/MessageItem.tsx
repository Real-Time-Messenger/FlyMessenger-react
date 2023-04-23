import { IDialogMessage } from "@/entities";
import { FC, useEffect, useState } from "react";
import { useStateSelector } from "@/stores/hooks";
import { useWebSocket } from "@/hoc/WebSocketProvider";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { ImageGallery } from "@/components/ui/messenger/ImageGallery";
import classNames from "classnames";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { ChatImage } from "@/components/ui/messenger/ChatImage";
import { CheckIcon, DoubleCheckIcon } from "@/components/icons";
import { parseMessageTime } from "@/helpers/helpers";

/**
 * Props for the {@link MessageItem} component.
 *
 * @extends IDialogMessage
 *
 * @property {boolean} showAvatar - Whether to show the avatar or not.
 * @property {string} className - The class name for the component.
 */
interface MessageItemProps extends IDialogMessage {
    showAvatar: boolean;
    className?: string;
}

/**
 * The variants for the message spawn animation.
 */
const messageSpawn = {
    hidden: {
        y: 20,
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.2,
        },
    },
};

/**
 * Renders a single message in the {@link MessagesList} component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const MessageItem: FC<MessageItemProps> = ({
    sentAt,
    isRead,
    showAvatar,
    sender,
    text,
    id,
    file,
    className,
}) => {
    // const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);
    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialogId = useStateSelector((state) => state.dialogs.activeDialog?.id);
    const activeDialog = dialogs.find((dialog) => dialog.id === activeDialogId);

    const images = activeDialog?.images;

    const currentUserId = useStateSelector((state) => state.user.current.id);

    const { readMessage } = useWebSocket();

    const [isObserved, setObserved] = useState<boolean>(false);
    const [isImageOpened, setImageOpened] = useState<boolean>(false);

    const isCurrentUser = sender.id === currentUserId;

    const observedMessageId = useStateSelector((state) => state.search.selectedMessageId);

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    /**
     * Mark Message as Read if it's in Viewport.
     */
    useEffect(() => {
        if (!inView || isCurrentUser || isRead || !activeDialogId) return;

        readMessage(activeDialogId, id);
    }, [activeDialogId, id, inView, isCurrentUser, isRead, readMessage]);

    /**
     * Message selection effect on `ObserverMessageId` change.
     */
    useEffect(() => {
        if (!observedMessageId || observedMessageId !== id) {
            setObserved(false);
            return;
        }

        setObserved(true);

        const fadeOut = setTimeout(() => {
            setObserved(false);
        }, 1500);

        return () => {
            clearTimeout(fadeOut);
        };
    }, [id, observedMessageId]);

    return (
        <>
            <AnimatePresence>
                {isImageOpened && file && (
                    <ImageGallery images={images ?? []} current={file} onClose={() => setImageOpened(false)} />
                )}
            </AnimatePresence>

            <motion.div
                variants={messageSpawn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={classNames(
                    "message-item relative flex px-2 py-1 transition-colors",
                    isObserved && "bg-[#98BDE750] dark:bg-[#416D9C50]",
                    isCurrentUser && "flex-row-reverse 2xl:flex-row",
                    className,
                )}
                ref={ref}
                id={id}
            >
                <div
                    className={classNames(
                        "relative mt-auto flex select-none items-center justify-center",
                        !showAvatar && "ml-[40px]",
                    )}
                >
                    {showAvatar && (
                        <Avatar src={sender.photoURL} alt="image" className="h-[40px] w-[40px] rounded-full" />
                    )}
                </div>

                <div
                    className={classNames(
                        "relative mx-2.5 rounded-lg p-2.5 transition-[background-color] sm:max-w-[400px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[700px] 2xl:max-w-4xl",
                        file ? "pr-14" : "pr-20",
                        isCurrentUser ? "bg-[#5B9BD965] dark:bg-[#304F74]" : "bg-white dark:bg-[#151F38]",
                    )}
                >
                    {file ? (
                        <div className="relative flex w-full items-center justify-center p-2">
                            <ChatImage url={file} onClick={() => setImageOpened(true)} />
                        </div>
                    ) : (
                        <span className="whitespace-pre-wrap break-all text-sm text-[#333333] dark:text-white">
                            {text}
                        </span>
                    )}

                    <div className="absolute bottom-2 right-2 z-0 flex select-none items-center text-xs">
                        {isCurrentUser && (
                            <>
                                {isRead ? (
                                    <DoubleCheckIcon className="mr-1 h-4 w-4 fill-[#696969] stroke-0 dark:fill-[#9E9E9E]" />
                                ) : (
                                    <CheckIcon className="h-4 w-4 fill-[#9E9E9E] stroke-0 dark:fill-[#9E9E9E]" />
                                )}
                            </>
                        )}
                        <span className="text-[#696969] dark:text-[#9E9E9E]">{parseMessageTime(sentAt)}</span>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
