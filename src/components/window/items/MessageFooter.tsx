import {ChangeEvent, createRef, KeyboardEvent, useCallback, useRef} from "react";
import {useTranslation} from "react-i18next";
import {useStateSelector} from "../../../stores/hooks";
import {ClipIcon, SendIcon} from "../../icons";
import {parseBase64} from "../../../helpers/helpers";
import {useWebSocket} from "../../../hoc/WebSocketProvider";

/**
 * Split the message into chunks of 1000 characters.
 *
 * @param {string} message - The Message to split.
 *
 * @returns {string[]} - The Array of Chunks.
 */
const splitMessage = (message: string): string[] => {
    if (message.length <= 1000) return [message];

    // Array to store the split messages
    const chunks = [];

    // Split the message into chunks of 1000 characters
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

export const MessageFooter = () => {
    const {t} = useTranslation();
    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);
    const isUserBlocked = useStateSelector((state) => state.dialogs.activeDialog?.user.isBlocked);

    const currentDialog = dialogs.find((dialog) => dialog.id === activeDialog?.id);

    const {sendMessage, typing} = useWebSocket();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileRef = createRef<HTMLInputElement>();

    /**
     * Toggles the User Dialog Status to `typing...`.
     */
    const typingQuery = (state: boolean): void => {
        if (!activeDialog?.id) return;

        typing(activeDialog.id, state)
    };

    /**
     * Call `typing` of `untyping` functions depending on the Textarea value.
     */
    const handleTyping = () =>
        textareaRef.current!.value.trim() !== "" ?
            typingQuery(true) :
            typingQuery(false);

    /**
     * Reset the Textarea to the initial state.
     */
    const resetTextarea = (): void => {
        if (!textareaRef.current) return;

        textareaRef.current.style.height = "20px";
        textareaRef.current.value = "";

        typingQuery(false);
    };

    /**
     * Handle the Key Press Event.
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
        }, [textareaRef.current] );

    /**
     * Handles the `Enter` Key Press Event (or Send Button Click).
     *
     * @param {KeyboardEvent<HTMLTextAreaElement>} event - The Keyboard Event.
     */
    const handleMessageSubmit = async (event: KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (event.key !== "Enter" || (event.key === "Enter" && event.shiftKey)) return;
        event.preventDefault();

        sendMessageQuery();
    };


    /**
     * Handles the File Upload Event.
     */
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
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
    };

    /**
     * Opens the File Dialog Window.
     */
    const openFileDialog = (): void => {
        if (!fileRef.current) return;

        fileRef.current.click();
    };

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
        <div
            className="duration-250 relative flex w-full items-center justify-between border-t border-t-[#CFD0D4] transition-colors dark:border-t-[#52525240] dark:bg-[#151F38]">
            <button
                className="group relative flex h-full cursor-pointer items-end justify-center py-3"
                onClick={openFileDialog}
            >
                <ClipIcon
                    className="duration-250 mx-3 h-6 w-6 stroke-[1.5] text-[#888888] transition-colors group-hover:text-[#161616] dark:text-[#7B7B7B] dark:group-hover:text-[#F5F5F5]"/>

                <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/png, image/jpeg, image/gif, video/mp4, video/webm, video/ogg"
                />
            </button>

            <div
                className="flex h-full w-full cursor-text py-2"
                onClick={() => textareaRef.current?.focus()}
            >
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
                    className="duration-250 mx-3 h-6 w-6 stroke-[1.5] text-[#888888] transition-colors group-hover:text-[#161616] dark:text-[#7B7B7B] dark:group-hover:text-[#F5F5F5]"/>
            </button>
        </div>
    );
}