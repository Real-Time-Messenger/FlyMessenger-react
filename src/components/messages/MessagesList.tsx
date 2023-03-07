import {memo, RefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useAppDispatch, useStateSelector} from "../../stores/hooks";
import {useTranslation} from "react-i18next";
import {Loader} from "../ui/Loader";
import classNames from "classnames";
import {AnimatePresence, motion} from "framer-motion";
import {ChevronDownIcon} from "../icons/ChevronDownIcon";
import {IDialog, IDialogMessage} from "../../entities";
import {getMessages} from "../../stores/slices/dialogs/dialogs";
import {useWebSocket} from "../../hoc/WebSocketProvider";
import { MessageItem } from "./items/MessageItem";

interface DialogMessageWithAvatar extends IDialogMessage {
    showAvatar: boolean;
}

interface MessagesListProps {
    data: DialogMessageWithAvatar[];
}


/**
 * Scroll to the first unread message
 *
 * @param {RefObject<HTMLElement>} ref - Ref to the element.
 * @param {IDialogMessage[]} messages - Messages array.
 * @param {string} userId - Current user id.
 *
 * @returns {boolean} - If true, scroll was performed.
 */
const scrollToFirstUnreadMessage = (ref: RefObject<HTMLDivElement>, messages: IDialogMessage[], userId: string): void => {
    if (!ref.current) return;

    // Get the message object from array of message
    // which has `isRead` property equal to `false`.
    // We need to get `id` of this message to scroll to it.
    const firstUnreadMessage = messages.find((message) => !message.isRead && message.sender.id !== userId);
    if (!firstUnreadMessage) {
        ref.current.scrollTop = ref.current.scrollHeight;
        return;
    }

    // Our message items has `id` attribute.
    // This attribute is needed to scroll get the message in DOM.
    const messageElement = ref.current.querySelector<HTMLDivElement>(`[id="${firstUnreadMessage.id}"]`);
    if (!messageElement) return;

    // scrollTo(ref, {top: messageElement.offsetTop});
    messageElement.scrollIntoView({block: 'start', inline: 'center'})

    return;
};

/**
 * Get date difference between current and previous message.
 *
 * @param {IDialogMessage[]} messages - The list of messages.
 * @param {number} index - The index of the message.
 *
 * @returns {boolean} - If true, date should be displayed (date sent is different from previous message date).
 */
const isDifferentDate = (index: number, messages: IDialogMessage[]): boolean => {
    const currentMessage = messages[index];
    const previousMessage = messages[index - 1];

    return (currentMessage && previousMessage && new Date(currentMessage.sentAt).toLocaleDateString() !== new Date(previousMessage.sentAt).toLocaleDateString()) || !previousMessage;
};


const Messages = memo(({data}: MessagesListProps) => {
    return (
        <>
            {data.map((message, index) => (
                <div key={message.id}>
                    {isDifferentDate(index, data) && (
                        <div className='flex items-center justify-center'>
                            <div
                                className='duration-250 flex items-center rounded-full bg-[#DCE1F0] py-1 px-4 transition-colors dark:bg-[#1F2B49]'>
                                    <span
                                        className='select-none text-xs dark:text-white'>{new Date(message.sentAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    )}

                    <MessageItem {...message}/>
                </div>
            ))}
        </>
    );
});

export const MessagesList = () => {
    const {t} = useTranslation();

    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialogId = useStateSelector((state) => state.dialogs.activeDialog?.id);
    const activeDialog = dialogs.find((dialog) => dialog.id === activeDialogId);
    const {messages} = activeDialog as IDialog;

    const observedDialogId = useStateSelector((state) => state.search.selectedMessageId);
    const userId = useStateSelector((state) => state.user.current.id);

    const dispatch = useAppDispatch();

    const [isMounted, setMounted] = useState<boolean>(false); // Detect if component is mounted.
    const [isFetching, setFetching] = useState<boolean>(false); // Detect if messages are fetching.
    const [canGoDown, setCanGoDown] = useState<boolean>(false); // Detect if stroll down button should be displayed.

    const [hasMore, setHasMore] = useState<boolean>(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);

    const {readMessage} = useWebSocket()

    /**
     * Array of Messages with `showAvatar` property, which indicates whether to Show Avatar or not.
     *
     * Algorithm:
     *     We iterate through all messages and check if the last message was sent by the same user.
     *     If it was, we set `showAvatar` to false, otherwise - true.
     */
    const sortedMessagesArray = useMemo(() => {
        return messages.map((message, index) => {
            const nextMessage = messages[index + 1];
            const isLastMessageFromUser = nextMessage?.sender.id !== message.sender.id;

            return {
                ...message,
                showAvatar: isLastMessageFromUser
            };
        }) as DialogMessageWithAvatar[]
    }, [messages]);

    /**
     * Scroll to the message, which was selected in the search control.
     */
    const scrollToObservedMessage = useCallback((): void => {
        if (!observedDialogId || !scrollRef.current) return;

        // As in the algorithm above, where we use `id` attribute,
        // we need to get the message element by id.
        const message = document.querySelector<HTMLDivElement>(`[id="${observedDialogId}"]`);
        if (!message) return;

        message.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, [scrollRef.current, observedDialogId]);

    /**
     * Handles if user scrolled up at lease 200px to show the scroll down button.
     */
    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;

        setCanGoDown(scrollRef.current.scrollTop * -1 > 1000);
    }, [scrollRef.current]);

    /**
     * Lazy Messages Loading.
     *
     * How it works:
     *        When user scrolls to the top of the list, we load more messages.
     *        If `ScrollTop` is less than 100, we load more messages.
     */
    const loadMoreMessages = useCallback(() => {
        if (!hasMore || isFetching || !activeDialog || !scrollRef.current || scrollRef.current.scrollTop > 100) return;

        setFetching(true);

        dispatch(getMessages({dialogId: activeDialog.id, skip: messages.length}))
            .unwrap()
            .then((messages) => {
                setHasMore(messages.length === 100)
            })
            .finally(() => setFetching(false));
    }, [hasMore, isFetching, scrollRef.current]);

    /**
     * Handles observer intersection.
     */
    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;

            if (entry.isIntersecting) {
                loadMoreMessages();
                handleScroll();
            }
        },
        [loadMoreMessages, handleScroll]
    );

    const handleScrollToBottom = useCallback(() => {
        const textarea = document.getElementById('message-footer__textarea');
        textarea?.focus();

        if (!scrollRef.current || !activeDialog) return;

        const lastMessage = document.querySelector<HTMLDivElement>(`[id="${activeDialog.messages[activeDialog.messages.length - 1].id}"]`);
        if (!lastMessage) return;

        lastMessage.scrollIntoView();

        const unreadMessages = sortedMessagesArray.filter(message => message.sender.id !== userId && !message.isRead);
        if (unreadMessages.length === 0) return;

        unreadMessages.forEach(message => {
            readMessage(activeDialog.id, message.id);
        });
    }, [scrollRef.current, activeDialog?.messages[activeDialog?.messages.length - 1]?.id, sortedMessagesArray, readMessage, activeDialog?.id]);

    /**
     * Bind the observer.
     */
    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0
        });

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [handleIntersection]);

    useEffect(() => {
        scrollToObservedMessage();
    }, [scrollToObservedMessage]);

    useEffect(() => {
        if (isMounted) return;

        scrollToFirstUnreadMessage(scrollRef, messages, userId)
        setMounted(true);
    }, [isMounted]);

    useEffect(() => {
        if (!scrollRef.current) return;

        const ref = scrollRef.current;
        ref.addEventListener('scroll', handleScroll);
        return () => ref.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!activeDialog) return;

        setHasMore(messages.length >= 100);
    }, [messages.length, activeDialog]);

    if (sortedMessagesArray.length === 0) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <div
                    className='flex flex-col items-center gap-3 p-4 rounded-lg transition-colors duration-250 select-none bg-[#F5F5F5] dark:bg-[#151F38]'>
                    <span className='text-[#161616] dark:text-[#FFFFFF]'>{t('messages.empty.title')}</span>

                    <span className='text-[#4C4C4C] dark:text-[#AFAFAF]'>{t('messages.empty.subtitle')}</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className={classNames('messages-parent relative flex h-full overflow-y-auto flex-col-reverse py-2')}
            ref={scrollRef}
        >
            <div className='flex w-full flex-col relative'>
                {hasMore && !isFetching && (
                    <Loader
                        ref={loaderRef}
                        className='mx-auto my-4 h-8 w-8'
                    />
                )}

                <AnimatePresence>
                    {canGoDown && (
                        <motion.div
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.25}}
                            exit={{opacity: 0, scale: 0.5}}
                            onClick={() => handleScrollToBottom()}
                            className='p-3 rounded-full transition-colors duration-250 cursor-pointer flex items-center select-none bg-[#FFFFFF] hover:bg-[#CAD5F2] dark:bg-[#1F2B49] dark:hover:bg-[#2B3C5F] fixed bottom-20 right-8 z-[10]'>
                            <ChevronDownIcon className='h-7 w-7'/>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Messages data={sortedMessagesArray}/>
            </div>
        </div>
    );
};