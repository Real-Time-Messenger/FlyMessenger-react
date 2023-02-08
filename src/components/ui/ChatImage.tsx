/**
 * Interface for the `ChatImage` component props.
 */
interface ChatImageProps {
    url: string;
    onClick?: () => void;
}

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
            <img
                src={url}
                alt={new Date().toString()}
                className="w-full h-full object-contain"
            />
        </div>
    );
};
