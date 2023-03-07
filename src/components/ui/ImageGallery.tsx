import {motion} from "framer-motion";
import {MouseEvent as ReactMouseEvent, useEffect, useRef, useState} from "react";
import useKeyPress from "../../hooks/useKeyPress";
import {ChevronLeftIcon, ChevronRightIcon, CloseIcon} from "../icons";

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
    const [scale, setScale] = useState<number>(1);
    const [top, setTop] = useState<number>(0);
    const [left, setLeft] = useState<number>(0);
    const [isDragging, setDragging] = useState<boolean>(false);

    const imageRef = useRef<HTMLImageElement>(null);

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
        setScale(1);
        setTop(0);
        setLeft(0);
    };

    const isPrevImage = images.indexOf(currentImage) > 0;
    const isNextImage = images.indexOf(currentImage) < images.length - 1;

    const handleDragStart = (e: ReactMouseEvent<HTMLImageElement>) => {
        e.preventDefault();

        setDragging(true);
    };

    const handleDragEnd = () => {
        setDragging(false);
    };

    useKeyPress("Escape", onClose);
    useKeyPress("ArrowLeft", () => toggleImage("left"));
    useKeyPress("ArrowRight", () => toggleImage("right"));

    useEffect(() => {
        const handleDrag = (e: MouseEvent) => {
            e.preventDefault();

            if (!isDragging) {
                return;
            }

            const imageRect = imageRef.current?.getBoundingClientRect();

            if (!imageRect) {
                return;
            }

            setScale((prevScale) => prevScale + e.movementX);

            // const isXOutOfBounds = imageRect.left < 0 || imageRect.right > window.innerWidth;
            // const isYOutOfBounds = imageRect.top < 0 || imageRect.bottom <= window.innerHeight;
            //
            // if (imageRect.top >= 0) {
            //     console.log(imageRect.top * scale);
            //     setTop(0);
            // }
            //
            // if (isXOutOfBounds) {
            //     setLeft((prevLeft) => prevLeft + e.movementX);
            // }
            //
            // if (isYOutOfBounds) {
            //     setTop((prevTop) => prevTop + e.movementY);
            // }
        };

        const handleMouseUp = () => {
            setDragging(false);
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleDrag);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        const image = document.querySelector(".image-gallery__image") as HTMLImageElement;
        if (!image) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
                setScale((prevScale) => {
                    const smoothScroll = e.deltaY < 0 ? 0.1 : -0.1;

                    const newScale = prevScale + smoothScroll;
                    if (newScale < 1) {
                        return 1;
                    }

                    return newScale;
                });
            } else {
                if (e.deltaY < 0 && isPrevImage) {
                    toggleImage("left");
                } else if (e.deltaY > 0 && isNextImage) {
                    toggleImage("right");
                }
            }
        }

        window.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        }
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[3] flex h-screen w-screen select-none items-center justify-center bg-black/80 dark:bg-black/60"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
        >
            <div className="image-gallery h-full">
                <div className="absolute left-0 top-0 flex h-screen flex-col">
                    <div className="pointer-events-none h-[96px] w-[96px] bg-transparent"/>

                    {isPrevImage && (
                        <button
                            className="duration-250 h-5/6 px-6 transition-colors hover:bg-[#C1C1C165] dark:hover:bg-[#C1C1C145] relative z-[2]"
                            onClick={() => toggleImage("left")}
                        >
                            <ChevronLeftIcon className="h-12 w-12 stroke-[2] text-white"/>
                        </button>
                    )}

                    <div className="pointer-events-none h-[96px] w-[96px] bg-transparent"/>
                </div>

                {/*<motion.div*/}
                {/*    className="relative"*/}
                {/*    initial={{scale: 0.9}}*/}
                {/*    animate={{scale: 1}}*/}
                {/*    exit={{scale: 0.9}}*/}
                {/*>*/}
                    <img
                        onMouseDown={handleDragStart}
                        onMouseUp={handleDragEnd}
                        ref={imageRef}
                        src={currentImage}
                        alt="Message image"
                        className="w-full h-full transition-transform transition-[transformOrigin] duration-250 relative image-gallery__image"
                        style={{transformOrigin: "center center", top, left, width: `${scale * 100}%`}}
                    />
                {/*</motion.div>*/}

                <div className="absolute right-0 top-0 flex h-screen flex-col">
                    <button
                        className="duration-250 flex items-center justify-center p-6 transition-colors hover:bg-[#C1C1C165] dark:hover:bg-[#C1C1C145] relative z-[2]"
                        onClick={onClose}
                    >
                        <CloseIcon className="h-12 w-12 stroke-[2] text-white"/>
                    </button>

                    {isNextImage && (
                        <button
                            className="duration-250 h-5/6 px-6 transition-colors hover:bg-[#C1C1C165] dark:hover:bg-[#C1C1C145] relative z-[2]"
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
