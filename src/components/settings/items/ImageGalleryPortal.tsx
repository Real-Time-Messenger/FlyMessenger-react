import { FC } from "react";
import { createPortal } from "react-dom";
import { ImageGallery } from "@/components/ui/messenger/ImageGallery";
import { AnimatePresence } from "framer-motion";

/**
 * Props for the {@link ImageGalleryPortal} component.
 *
 * @interface ImageGalleryPortalProps
 *
 * @property {boolean} isOpened - Whether the {@link ImageGallery} is opened.
 * @property {() => void} onClose - The callback to call when the {@link ImageGallery} is closed.
 * @property {string[]} images - The images to display.
 * @property {string} current - The current image.
 */
interface ImageGalleryPortalProps {
    isOpened: boolean;
    onClose: () => void;
    images: string[];
    current: string;
}

/**
 * Renders the {@link ImageGallery} component as a portal (absolute at the DOM root).
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ImageGalleryPortal: FC<ImageGalleryPortalProps> = ({ isOpened, images, current, onClose }) => {
    return createPortal(
        <AnimatePresence>
            {isOpened && <ImageGallery onClose={onClose} images={images} current={current} />}
        </AnimatePresence>,
        document.body,
    );
};
