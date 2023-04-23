import { FC, useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/icons";
import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { Navbar } from "@/components/partials/landing/navbar/Navbar";
import { Footer } from "@/components/partials/landing/Footer";
import { motion } from "framer-motion";

/**
 * Renders a button that scrolls to the top of the page.
 */
const ScrollButton: FC = () => {
    const [show, setShow] = useState<boolean>(false);

    /**
     * Handles the scroll event and shows the button if the user has scrolled down.
     */
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <motion.div
            initial={{ y: 200 }}
            animate={{ y: show ? 0 : 200 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-10 right-10 z-50 hidden cursor-pointer rounded-full bg-[#E9EBEF] p-3 text-[#161616] transition-colors hover:bg-[#98BDE7] dark:bg-[#1F2B49] dark:text-white md:block"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <ArrowUpIcon className="h-10 w-10 stroke-2" />
        </motion.div>
    );
};

/**
 * Renders a layout for the landing page.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const LandingLayout: FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="grid min-h-screen w-screen grid-rows-[auto_1fr_auto] bg-white transition-colors dark:bg-[#10182B]">
            <Navbar />

            <div className="container row-span-full my-[60px] mx-auto w-screen py-[40px] px-4 text-[#161616] transition-colors dark:text-white">
                {children}
            </div>

            <ScrollButton />

            <Footer />
        </div>
    );
};
