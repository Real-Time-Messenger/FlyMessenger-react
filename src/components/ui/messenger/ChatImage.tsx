/**
 * Props for the {@link ChatImage} component.
 *
 * @interface ChatImageProps
 *
 * @property {string} url - The image URL.
 * @property {() => void} onClick - The click handler.
 */
interface ChatImageProps {
    url: string;
    onClick?: () => void;
}

/**
 * Renders an image in the chat.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ChatImage = ({ url, onClick }: ChatImageProps) => {
    return (
        <div
            className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg"
            onClick={onClick}
            style={{
                maxWidth: "240px",
                maxHeight: "240px",
                minWidth: "100px",
                minHeight: "100px",
            }}
        >
            <img src={url} alt={new Date().toString()} className="h-full w-full object-contain" />
        </div>
    );
};
