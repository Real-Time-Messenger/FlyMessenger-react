import { motion } from "framer-motion";
import { FC, TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { useKeyPress } from "@/hooks";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../../icons";

/**
 * Props for the {@link ImageGallery} component.
 *
 * @property {string[]} images - The array of images to show.
 * @property {string} current - The current image.
 * @property {() => void} onClose - The callback for when the image gallery is closed.
 */
interface ImageGalleryProps {
    images: string[];
    current: string;
    onClose: () => void;
}

/**
 * Component which displays a gallery of images.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ImageGallery: FC<ImageGalleryProps> = ({ images, current, onClose }) => {
    const [currentImage, setImage] = useState<string>(current);
    const [scale, setScale] = useState<number>(1);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const imageRef = useRef<HTMLImageElement>(null);

    const isPrevImage = images.indexOf(currentImage) > 0;
    const isNextImage = images.indexOf(currentImage) < images.length - 1;

    /**
     * Toggles current Image to the Next or Previous one (depends on `direction`).
     *
     * @param {"left" | "right"} direction - Direction to toggle.
     */
    const toggleImage = useCallback(
        (direction: "left" | "right"): void => {
            const currentIndex = images.indexOf(currentImage);
            const nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

            if (nextIndex < 0 || nextIndex >= images.length) return;

            setImage(images[nextIndex]);
            setScale(1);
        },
        [currentImage, images],
    );

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) toggleImage("right");
        if (isRightSwipe) toggleImage("left");

        setTouchStart(null);
        setTouchEnd(null);
    };

    /**
     * Detects the key presses.
     */
    useKeyPress("Escape", onClose);
    useKeyPress("ArrowLeft", () => toggleImage("left"));
    useKeyPress("ArrowRight", () => toggleImage("right"));

    useEffect(() => {
        window.addEventListener("wheel", (event) => toggleImage(event.deltaY > 0 ? "right" : "left"), {
            passive: true,
        });
    }, [toggleImage]);

    return (
        <motion.div
            className="fixed inset-0 z-[3] flex h-screen w-screen select-none items-center justify-center bg-black/80 dark:bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
            transition={{ duration: 0.2 }}
        >
            <div className="image-gallery flex h-full items-center justify-center">
                <div
                    className="absolute left-0 top-0 flex h-screen flex-col"
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onTouchStart={onTouchStart}
                >
                    <div className="pointer-events-none h-[96px] w-[96px] bg-transparent" />

                    {isPrevImage && (
                        <button
                            className="relative z-[2] flex h-5/6 items-center px-6 transition-colors lg:hover:bg-[#C1C1C165] lg:dark:hover:bg-[#C1C1C145]"
                            onClick={() => toggleImage("left")}
                        >
                            <ChevronLeftIcon className="h-12 w-12 stroke-[2] text-white" />
                        </button>
                    )}

                    <div className="pointer-events-none h-[96px] w-[96px] bg-transparent" />
                </div>

                <img
                    ref={imageRef}
                    src={currentImage}
                    alt="Message image"
                    draggable={false}
                    className="image-gallery__image relative"
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onTouchStart={onTouchStart}
                    style={{ transformOrigin: "center center", transform: `scale(${scale})` }}
                />

                <div className="absolute right-0 top-0 flex h-screen flex-col">
                    <button
                        className="transition-color relative z-[2] flex items-center justify-center p-6 lg:hover:bg-[#C1C1C165] lg:dark:hover:bg-[#C1C1C145]"
                        onClick={onClose}
                    >
                        <CloseIcon className="h-12 w-12 stroke-[2] text-white" />
                    </button>

                    {isNextImage && (
                        <button
                            className="relative z-[2] flex h-5/6 items-center px-6 transition-colors lg:hover:bg-[#C1C1C165] lg:dark:hover:bg-[#C1C1C145]"
                            onClick={() => toggleImage("right")}
                        >
                            <ChevronRightIcon className="h-12 w-12 stroke-[2] text-white" />
                        </button>
                    )}

                    <div className="pointer-events-none h-[96px] w-[96px] bg-transparent" />
                </div>
            </div>
        </motion.div>
    );
};
