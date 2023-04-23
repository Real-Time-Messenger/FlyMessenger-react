import { AnimatePresence, motion } from "framer-motion";
import { bannerDark, bannerLight } from "../../../assets/images";
import { AnimatedImage } from "@/components/ui/landing/AnimatedImage";
import { useStateSelector } from "@/stores/hooks";
import {
    approval,
    chart,
    comments,
    ellipse1,
    ellipse2,
    ellipse3,
    faq,
    openedFolder,
    polygon2,
    settings,
    support,
    template,
    vector1,
    vector2,
    vector3,
    vector4,
    vector5,
    voicePresentation,
} from "../../../assets/icons";
import { FC } from "react";

/**
 * An array with icons that will be animated next to the banner.
 */
const arrayOfIcons = [
    vector5,
    vector2,
    vector4,
    vector3,
    vector1,
    faq,
    template,
    support,
    polygon2,
    settings,
    comments,
    chart,
    approval,
    ellipse2,
    ellipse3,
    ellipse1,
    openedFolder,
    voicePresentation,
];

/**
 * The banner component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const Banner: FC = () => {
    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);

    return (
        <div className="md:mb-30 relative my-5 mb-10 lg:py-20">
            <div className="mx-auto aspect-video max-w-[1190px] xl:h-[648px] xl:w-[1190px]">
                <AnimatePresence>
                    {isDarkMode ? (
                        <motion.img
                            key="banner"
                            src={bannerDark}
                            alt="bannerLight"
                            className="main-image w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    ) : (
                        <motion.img
                            key="banner"
                            src={bannerLight}
                            alt="bannerLight"
                            className="main-image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {arrayOfIcons.map((icon, index) => {
                const name = icon.split("/").pop()?.split(".")[0];
                const slug = name?.replace(/\s+/g, "-").toLowerCase();

                if (!slug) return null;

                return (
                    <AnimatedImage src={icon} slug={slug} key={index} index={index + 1} className="hidden md:block" />
                );
            })}
        </div>
    );
};
