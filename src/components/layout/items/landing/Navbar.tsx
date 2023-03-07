import {GithubIcon, GlobeIcon, HamburgerMenuIcon, LogoIcon} from "../../../icons"
import {useTranslation} from "react-i18next";
import {AnimatePresence, motion} from "framer-motion";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {languages} from "../../../settings/pages/language/LanguagePage";
import {FC, memo, useState} from "react";
import {changeLanguage} from "i18next";
import {ChevronDownIcon} from "../../../icons/ChevronDownIcon";
import {useActionsCreators, useStateSelector} from "../../../../stores/hooks";
import {SunIcon} from "../../../icons/SunIcon";
import {sidebarActions} from "../../../../stores/slices/ui/sidebar/sidebar";
import {MoonIcon} from "../../../icons/MoonIcon";

interface NavbarLinks {
    label: string;
    to: string;
}

const links: NavbarLinks[] = [
    {
        label: "home",
        to: "/",
    },
    {
        label: "faq",
        to: "/faq",
    },
    {
        label: "privacy",
        to: "/privacy",
    }
];

const MobileLanguageToggleModal: FC<{ isOpened: boolean, onClose: () => void }> = ({onClose, isOpened}) => {
    const {i18n} = useTranslation();

    return (
        <AnimatePresence>
            {isOpened && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="fixed inset-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

                    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
                        <div className="bg-white dark:bg-[#151F38] rounded-lg shadow-lg p-4 w-[300px]">
                            <div className="flex flex-col gap-2">
                                {Object.keys(languages).map((language) => (
                                    <div
                                        key={language}
                                        onClick={() => {changeLanguage(language); onClose()}}
                                        className={classNames("flex py-2 px-4 transition-colors", language === i18n.resolvedLanguage ? "text-[#161616] dark:text-white" : "text-[#696969bb] dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white")}
                                    >
                                        <span>{languages[language as keyof typeof languages].nativeName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const LanguageTogglerMobile: FC = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const {i18n} = useTranslation();

    return (
        <>
            <div
                className="flex cursor-pointer select-none items-center rounded-full text-[#161616] dark:text-white relative w-[175px]">
                <motion.div
                    onClick={() => setIsOpened(!isOpened)}
                    className="flex w-full truncate cursor-pointer items-center rounded py-1.5 px-4 gap-3 transition-colors">
                    <GlobeIcon className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] stroke-[1.5]"/>

                    <span className="truncate">{languages[(i18n.resolvedLanguage as keyof typeof languages) || "et"].nativeName || null}</span>
                </motion.div>
            </div>

            <MobileLanguageToggleModal isOpened={isOpened} onClose={() => setIsOpened(false)}/>
        </>
    )
}

const LanguageToggler: FC = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const {i18n} = useTranslation();

    return (
        <div
            className={classNames("flex cursor-pointer select-none items-center rounded-full transition-colors dark:text-white relative border w-[175px]", isOpened ? "border-[#161616] dark:border-white" : "border-[#16161650] dark:border-[#4E5772] group hover:border-[#161616] dark:hover:border-white")}
        >
            <motion.div
                onClick={() => setIsOpened(!isOpened)}
                className={classNames("flex w-full truncate cursor-pointer items-center rounded py-1.5 px-4 gap-3 transition-colors", isOpened ? "text-[#161616] dark:text-white" : "text-[#696969] dark:text-[#4E5772] group-hover:text-[#161616] dark:group-hover:text-white")}>
                <GlobeIcon className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] stroke-[1.5]"/>

                <span
                    className="truncate">{languages[(i18n.resolvedLanguage as keyof typeof languages) || "et"].nativeName || null}</span>

                <ChevronDownIcon
                    className={classNames("w-[16px] h-[16px] min-w-[16px] min-h-[16px] stroke-[1.5] transition-transform duration-150 ease-in ml-auto", isOpened && "rotate-180")}/>
            </motion.div>

            <AnimatePresence>
                {isOpened && (
                    <>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 0.3}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                            className="fixed bg-black z-[1] cursor-default top-[60px] inset-0"
                            onClick={() => setIsOpened(false)}
                        />

                        <motion.div
                            className="absolute top-16 right-0 rounded-xl overflow-hidden bg-[#F8F9FE] transition-colors dark:bg-[#151F38] shadow-lg z-[2] w-full"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: 0.2}}
                        >
                            {Object.keys(languages).map((language) => (
                                <div
                                    key={language}
                                    onClick={() => changeLanguage(language)}
                                    className={classNames("flex p-2 px-4 transition-colors", language === i18n.resolvedLanguage ? "text-[#161616] dark:text-white" : "text-[#696969bb] dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white")}
                                >
                                    <span>{languages[language as keyof typeof languages].nativeName}</span>
                                </div>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
};

const DarkModeTogglerMobile: FC = () => {
    const {t} = useTranslation();

    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);
    const sidebarStore = useActionsCreators(sidebarActions);

    return (
        <button className="py-2 px-4 flex gap-3 items-center text-[#161616] dark:text-white" onClick={() => sidebarStore.toggleDarkMode({state: !isDarkMode})}>
            {isDarkMode ? (
                <SunIcon className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] stroke-[1.5]"/>
            ) : (
                <MoonIcon className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] stroke-[1.5]"/>
            )}

            <span>{t(`navbar.themes.${isDarkMode ? "light" : "dark"}`)}</span>
        </button>
    )
}

const DarkModeToggler = () => {
    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);
    const sidebarStore = useActionsCreators(sidebarActions);

    return (
        <button
            className="flex cursor-pointer items-center justify-center p-2 transition-colors hover:text-[#161616] dark:hover:text-white select-none"
            onClick={() => sidebarStore.toggleDarkMode({state: !isDarkMode})}
        >
            <AnimatePresence mode="wait">
                {isDarkMode ? (
                    <motion.div
                        key="dark"
                        initial={false}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.5}}
                        transition={{duration: 0.1}}
                    >
                        <SunIcon className="h-6 w-6 stroke-2"/>
                    </motion.div>
                ) : (
                    <motion.div
                        key="light"
                        initial={false}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.5}}
                        transition={{duration: 0.1}}
                    >
                        <MoonIcon className="h-6 w-6 stroke-2"/>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export const Navbar = memo(() => {
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);

    const {t} = useTranslation();

    return (
        <div
            className="fixed top-0 w-full z-[1] flex bg-[#F8F9FE] items-center justify-center h-[60px] text-[#696969] dark:bg-[#151F38] dark:text-[#4E5772] transition-colors">
            <div className="container h-full items-center hidden lg:flex px-2">
                <div className="w-full flex items-center h-full justify-between">
                    <div className="flex gap-3 h-full">
                        <div className="rounded-full flex items-center justify-center bg-white h-fit my-auto p-2">
                            <LogoIcon className="w-6 h-6 stroke-[1.5]"/>
                        </div>

                        <div className="flex gap-3 ml-5 h-full overflow-hidden">
                            {links.map((link) => {
                                const isActive = window.location.pathname === link.to;

                                return (
                                    <motion.div className="px-3" key={link.label}>
                                        <Link to={link.to}
                                              className={classNames("flex h-full justify-between items-center relative select-none transition-colors", isActive ? "text-[#161616] dark:text-white" : "hover:text-[#161616] dark:hover:text-white")}>
                                            <span
                                                className="font-medium my-auto text-lg">
                                                {t(`navbar.${link.label}`)}
                                            </span>

                                            {isActive && (
                                                <motion.div
                                                    layoutId="underline"
                                                    className="absolute bottom-0 left-0 w-full h-1 bg-[#98BDE7] dark:bg-[#1F2B49] transition-colors"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <LanguageToggler/>

                        <a href="https://github.com/Real-Time-Messenger" target="_blank"
                           className="p-2 transition-colors hover:text-[#161616] dark:hover:text-white">
                            <GithubIcon className="w-6 h-6 stroke-2"/>
                        </a>

                        <DarkModeToggler/>
                    </div>
                </div>
            </div>

            <div className="flex lg:hidden w-full px-2 relative">
                <div className="flex justify-between w-full">
                    <div className="rounded-full flex items-center justify-center bg-white h-fit my-auto p-2 ml-2">
                        <LogoIcon className="w-6 h-6 stroke-[1.5]"/>
                    </div>

                    <button className="p-2 rounded-lg transition-colors hover:bg-[#E5E7F2] dark:hover:bg-[#1F2B49]"
                            onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}>
                        <HamburgerMenuIcon className="w-8 h-8 stroke-2 text-[#161616] dark:text-white"/>
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpened && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: 0.2}}
                            className="absolute top-[54px] right-0 min-h-[200px] overflow-hidden bg-[#F8F9FE] transition-colors dark:bg-[#151F38] shadow-lg z-[2] w-full border-t-2 border-[#E5E7F2] dark:border-[#1F2B49]"
                        >
                            <div className="flex flex-col gap-3 py-2">
                                {links.map((link) => {
                                    const isActive = window.location.pathname === link.to;

                                    return (
                                        <motion.div className="px-3" key={link.label}>
                                            <Link to={link.to}
                                                  className={classNames("flex h-full justify-between items-center relative select-none px-3 transition-colors border-l-2 py-1", isActive ? "text-[#161616] dark:text-white border-l-[#161616] dark:border-l-white" : "hover:text-[#161616] dark:hover:text-white border-l-transparent")}>
                                                <span
                                                    className="font-medium my-auto text-lg">
                                                    {t(`navbar.${link.label}`)}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div
                                className="mt-4 mt-4 transition-colors border-t border-[#E5E7F2] dark:border-[#1F2B49] flex flex-col gap-3 py-2 px-3">
                                <LanguageTogglerMobile/>

                                <DarkModeTogglerMobile/>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
})