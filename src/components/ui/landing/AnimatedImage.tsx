import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

/**
 * Props for the {@link AnimatedImage} component.
 *
 * @interface AnimatedImageProps
 *
 * @property {string} src - The source of the image.
 * @property {string} className - The class name of the image.
 * @property {string} slug - The slug of the image.
 * @property {number} index - The index of the image.
 */
interface AnimatedImageProps {
    src: string;
    className?: string;
    slug: string;
    index: number;
}

/**
 * A component that renders animated icons for a banner on the {@link MainPage} component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const AnimatedImage: FC<AnimatedImageProps> = ({ src, className, slug, index }) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [x, setX] = useState<number>(Math.floor(Math.random() * 40) - 20);
    const [y, setY] = useState<number>(Math.floor(Math.random() * 40) - 20);

    /**
     * Animates the image.
     */
    const animate = (): void => {
        setX((x) => (x > 20 ? x - 2 : x < -20 ? x + 2 : Math.floor(Math.random() * 2) === 0 ? x + 2 : x - 2));
        setY((y) => (y > 20 ? y - 2 : y < -20 ? y + 2 : Math.floor(Math.random() * 2) === 0 ? y + 2 : y - 2));
    };

    /**
     * Sets the image as loaded after 2 seconds.
     */
    useEffect(() => {
        if (isLoaded) return;

        setTimeout(() => setIsLoaded(true), 2000);
    }, [isLoaded]);

    /**
     * Animates the image every 50 milliseconds.
     */
    useEffect(() => {
        if (!isLoaded) return;

        const interval = setInterval(() => animate(), 50);
        return () => clearInterval(interval);
    }, [isLoaded]);

    return (
        <motion.img
            src={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className={classNames("absolute transition-transform duration-[500ms]", `icon-${slug}`, className)}
            style={isLoaded ? { x, y } : {}}
            alt={slug}
        />
    );
};
