import {motion} from "framer-motion";
import {useState} from "react";
import useKeyPress from "../../hooks/useKeyPress";
import {ChevronLeftIcon, ChevronRightIcon, CloseIcon} from "../icons";
import {Avatar} from "./Avatar";

/**
 * Interface for `ImageGallery` component.
 */
interface ImageGalleryProps {
    images: string[];
    current: string;
    onClose: () => void;
}

export const ImageGallery = ({images, current, onClose}: ImageGalleryProps) => {
    const [currentImage, setImage] = useState<string>(current);

    /**
     * Toggles current Image to the Next or Previous one (depends on `direction`).
     *
     * @param {"left" | "right"} direction - Direction to toggle.
     */
    const toggleImage = (direction: "left" | "right"): void => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

        if (nextIndex < 0 || nextIndex >= images.length) return;

        setImage(images[nextIndex]);
    };

    const isPrevImage = images.indexOf(currentImage) > 0;
    const isNextImage = images.indexOf(currentImage) < images.length - 1;

    useKeyPress("Escape", onClose);
    useKeyPress("ArrowLeft", () => toggleImage("left"));
    useKeyPress("ArrowRight", () => toggleImage("right"));

    return (
        <motion.div
            className="fixed inset-0 z-[3] flex h-screen w-screen select-none items-center justify-center bg-black/80 dark:bg-black/60"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
        >
            <div className="image-gallery">
                <div className="absolute left-0 top-0 flex h-screen flex-col">
                    <div className="pointer-events-none h-[96px] w-[96px] bg-transparent"/>

                    {isPrevImage && (
                        <button
                            className="duration-250 h-5/6 px-6 transition-colors hover:bg-[#C1C1C165] dark:hover:bg-[#C1C1C145]"
                            onClick={() => toggleImage("left")}
                        >
                            <ChevronLeftIcon className="h-12 w-12 stroke-[2] text-white"/>
                        </button>
                    )}

                    <div className="pointer-events-none h-[96px] w-[96px] bg-transparent"/>
                </div>

                <motion.div
                    className="relative overflow-hidden"
                    style={{maxWidth: "90vw", maxHeight: "90vh"}}
                    initial={{scale: 0.9}}
                    animate={{scale: 1}}
                    exit={{scale: 0.9}}
                >
                    <Avatar
                        src={currentImage}
                        alt="Message image"
                        className="w-full h-full"/>
                </motion.div>

                <div className="absolute right-0 top-0 flex h-screen flex-col">
                    <button
                        className="duration-250 flex items-center justify-center p-6 transition-colors hover:bg-[#C1C1C165] dark:hover:bg-[#C1C1C145]"
                        onClick={onClose}
                    >
                        <CloseIcon className="h-12 w-12 stroke-[2] text-white"/>
                    </button>

                    {isNextImage && (
                        <button
                            className="duration-250 h-5/6 px-6 transition-colors hover:bg-[#C1C1C165] dark:hover:bg-[#C1C1C145]"
                            onClick={() => toggleImage("right")}
                        >
                            <ChevronRightIcon className="h-12 w-12 stroke-[2] text-white"/>
                        </button>
                    )}

                    <div className="pointer-events-none h-[96px] w-[96px] bg-transparent"/>
                </div>
            </div>
        </motion.div>
    );
};
