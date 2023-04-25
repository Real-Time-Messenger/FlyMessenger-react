import {useTranslation} from "react-i18next";
import {useActionCreators, useStateSelector} from "@/stores/hooks";
import {useWebSocket} from "@/hoc/WebSocketProvider";
import {ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";
import {parseBase64} from "@/helpers/helpers";
import {ArrowUpIcon, ClipIcon, SendIcon} from "@/components/icons";
import {searchActions} from "@/stores/slices/search/search";
import classNames from "classnames";
import { MobileMessageFooter } from "./items/MobileMessageFooter";

/**
 * Split the message into chunks of 1000 characters.
 *
 * @param {string} message - The Message to split.
 *
 * @returns {string[]} - The Array of Chunks.
 */
const splitMessage = (message: string): string[] => {
    if (message.length <= 1000) return [message];

    const chunks = [];
    const words = message.split(" ");

    if (words.length === 1) {
        for (let i = 0; i < message.length; i += 1000) {
            chunks.push(message.slice(i, i + 1000));
        }

        return chunks;
    }

    let chunk = "";
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (chunk.length + word.length > 1000) {
            chunks.push(chunk);
            chunk = "";
        }
        chunk += word + " ";
    }
    chunks.push(chunk);

    return chunks;
};

/**
 * The footer of the message window. Contains a field for entering a message and a button for sending a message.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const MessageFooter: FC = () => {
    const {t} = useTranslation();
    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);

    const currentDialog = dialogs.find((dialog) => dialog.id === activeDialog?.id);

    const {sendMessage, typing} = useWebSocket();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const isMobileUserSearching = !!useStateSelector((state) => state.search.selectedMobileUser);

    /**
     * Toggles the user dialog status to `typing...`.
     */
    const typingQuery = useCallback(
        (state: boolean): void => {
            if (!activeDialog?.id) return;

            typing(activeDialog.id, state);
        },
        [activeDialog?.id, typing],
    );

    /**
     * A function that sends a message to the server whether the user is writing a message or not.
     */
    const handleTyping = useCallback(
        () => (textareaRef.current?.value.trim() !== "" ? typingQuery(true) : typingQuery(false)),
        [typingQuery],
    );

    /**
     * Reset the textarea to the initial state.
     */
    const resetTextarea = useCallback((): void => {
        if (!textareaRef.current) return;

        textareaRef.current.style.height = "20px";
        textareaRef.current.value = "";

        typingQuery(false);
    }, [typingQuery]);

    /**
     * Handle the key press event.
     */
    const handleTextareaEvent = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>): void => {
            if (!textareaRef.current) return;
            if (textareaRef.current.value.trim() === "") {
                resetTextarea();
                return;
            }

            // Resize the Textarea to fit the content.
            textareaRef.current.style.height = "0";
            textareaRef.current.style.height = `${event.target.scrollHeight}px`;

            handleTyping();
        },
        [handleTyping, resetTextarea],
    );

    /**
     * Handles the `Enter` key press event (or send button click).
     *
     * @param {KeyboardEvent<HTMLTextAreaElement>} event - The keyboard event.
     */
    const handleMessageSubmit = async (event: KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (event.key !== "Enter" || (event.key === "Enter" && event.shiftKey)) return;
        event.preventDefault();

        sendMessageQuery();
    };

    /**
     * Handles the file upload event.
     */
    const handleFileUpload = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            if (!fileRef.current || !event.target.files || !activeDialog) return;

            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const fileObject = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: parseBase64(reader.result as string),
                };

                sendMessage(activeDialog.id, {file: fileObject});
            };

            reader.readAsDataURL(file);
            fileRef.current.value = "";
        },
        [activeDialog, fileRef, sendMessage],
    );

    /**
     * Opens the file dialog window.
     */
    const openFileDialog = (): void => {
        if (!fileRef.current) return;

        fileRef.current.click();
    };

    /**
     * Sends the message to the server.
     */
    const sendMessageQuery = () => {
        if (!activeDialog || !textareaRef.current) return;

        const message = textareaRef.current.value.trim();
        const chunks = splitMessage(message);

        for (const chunk of chunks) {
            if (chunk.trim() === "") continue;

            sendMessage(activeDialog.id, {text: chunk});
        }

        resetTextarea();
    };

    if (currentDialog?.user.isBlocked || currentDialog?.isMeBlocked) return null;
    return (
        <>
            {isMobileUserSearching && <MobileMessageFooter />}

            <div
                className={classNames("relative w-full items-center justify-between border-t border-t-[#CFD0D4] transition-colors dark:border-t-[#52525240] dark:bg-[#151F38]", isMobileUserSearching ? "hidden lg:flex" : "flex")}>
                <button
                    className="group relative flex h-full cursor-pointer items-end justify-center py-3"
                    onClick={openFileDialog}
                >
                    <ClipIcon
                        className="mx-3 h-6 w-6 stroke-[1.5] text-[#888888] transition-colors group-hover:text-[#161616] dark:text-[#7B7B7B] dark:group-hover:text-[#F5F5F5]"/>

                    <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/png, image/jpeg, image/gif, video/mp4, video/webm, video/ogg"
                    />
                </button>

                <div className="flex h-full w-full cursor-text py-2" onClick={() => textareaRef.current?.focus()}>
                <textarea
                    className="no-scrollbar my-auto h-5 max-h-44 w-full cursor-text resize-none overflow-y-scroll whitespace-pre-wrap break-words bg-transparent text-sm placeholder-[#696969] outline-none"
                    placeholder={t("messages.writeAMessage").toString()}
                    ref={textareaRef}
                    id="message-footer__textarea"
                    spellCheck="true"
                    onInput={handleTextareaEvent}
                    onKeyDown={handleMessageSubmit}
                />
                </div>

                <button
                    className="group flex h-full cursor-pointer items-end justify-center py-3"
                    onClick={sendMessageQuery}
                >
                    <SendIcon
                        className="mx-3 h-6 w-6 stroke-[1.5] text-[#888888] transition-colors group-hover:text-[#161616] dark:text-[#7B7B7B] dark:group-hover:text-[#F5F5F5]"/>
                </button>
            </div>
        </>
    );
};
