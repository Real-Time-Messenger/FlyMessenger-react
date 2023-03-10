import {FC, useState} from "react";
import {ChildrenProps} from "../../interfaces/ChildrenProps";
import {Footer} from "../pages/landing/items/Footer";
import {Navbar} from "../pages/landing/items/Navbar";
import {ArrowUpIcon} from "../icons";
import { motion } from "framer-motion";

const TopButton: FC = () => {
    const [show, setShow] = useState<boolean>(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    window.addEventListener("scroll", handleScroll);

    return (
        <motion.div
            initial={{y: 200}}
            animate={{y: show ? 0 : 200}}
            transition={{duration: 0.5}}
            className="fixed bottom-10 right-10 z-50 cursor-pointer rounded-full transition-colors bg-[#E9EBEF] dark:bg-[#1F2B49] text-[#161616] dark:text-white p-3 hover:bg-[#98BDE7] hidden md:block"
            onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
            <ArrowUpIcon className="w-10 h-10 stroke-2"/>
        </motion.div>
    );
}

export const LandingLayout: FC<ChildrenProps> = ({children}) => {
    return (
        <div
            className="grid grid-rows-[auto_1fr_auto] w-screen min-h-screen transition-colors bg-white dark:bg-[#10182B]">
            <Navbar/>

            <div
                className="mt-[60px] pt-[40px] mx-auto row-span-full container w-full text-[#161616] dark:text-white transition-colors">
                {children}
            </div>

            <TopButton/>

            <Footer/>
        </div>
    );
};