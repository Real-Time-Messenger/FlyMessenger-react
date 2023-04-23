import { FC, useState } from "react";
import { GithubIcon, HamburgerMenuIcon, LogoIcon } from "@/components/icons";
import { NavbarLink } from "@/components/partials/landing/navbar/items/NavbarLink";
import { LanguageToggler, LanguageTogglerMobile } from "@/components/partials/landing/navbar/items/LanguageToggler";
import { DarkModeToggler, DarkModeTogglerMobile } from "@/components/partials/landing/navbar/items/DarkModeToggler";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { t } from "i18next";
import { DarkenedBackground } from "@/components/layouts/extra/DarkenedBackground";

/**
 * Interface for the {@link NavbarLink} component.
 *
 * @interface NavbarLinkProps
 *
 * @property {string} label - Label of the link.
 * @property {string} to - Path to navigate to.
 */
export interface NavbarLinkProps {
    label: string;
    to: string;
}

/**
 * List of links to display in the {@link Navbar}.
 */
const links: NavbarLinkProps[] = [
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
    },
];

/**
 * Navbar component in landing page layout.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const Navbar: FC = () => {
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);

    return (
        <div className="fixed top-0 z-[1] flex h-[60px] w-full items-center justify-center bg-[#F8F9FE] text-[#696969] transition-colors dark:bg-[#151F38] dark:text-[#4E5772]">
            <div className="container hidden h-full items-center px-2 lg:flex">
                <div className="flex h-full w-full items-center justify-between">
                    <div className="flex h-full gap-3">
                        <div className="my-auto flex h-fit items-center justify-center rounded-full bg-white p-2">
                            <LogoIcon className="h-6 w-6 stroke-[1.5]" />
                        </div>

                        <div className="ml-5 flex h-full gap-3 overflow-hidden">
                            {links.map((link) => (
                                <NavbarLink key={link.label} {...link} />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <LanguageToggler />

                        <a
                            href="https://github.com/Real-Time-Messenger"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 transition-colors hover:text-[#161616] dark:hover:text-white"
                        >
                            <GithubIcon className="h-6 w-6 stroke-2" />
                        </a>

                        <DarkModeToggler />
                    </div>
                </div>
            </div>

            <DarkenedBackground
                isDarkened={isMobileMenuOpened}
                zIndex={0}
                onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}
            />

            <div className="relative flex w-full px-2 lg:hidden">
                <div className="flex w-full justify-between">
                    <div className="my-auto ml-2 flex h-fit items-center justify-center rounded-full bg-white p-2">
                        <LogoIcon className="h-6 w-6 stroke-[1.5]" />
                    </div>

                    <button
                        className="rounded-lg p-2 transition-colors hover:bg-[#E5E7F2] dark:hover:bg-[#1F2B49]"
                        onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}
                    >
                        <HamburgerMenuIcon className="h-8 w-8 stroke-2 text-[#161616] dark:text-white" />
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpened && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-[54px] right-0 z-[2] min-h-[200px] w-full overflow-hidden border-t-2 border-[#E5E7F2] bg-[#F8F9FE] shadow-lg transition-colors dark:border-[#1F2B49] dark:bg-[#151F38]"
                        >
                            <div className="flex flex-col gap-3 py-2">
                                {links.map((link) => {
                                    const isActive = window.location.pathname === link.to;

                                    return (
                                        <motion.div className="px-3" key={link.label}>
                                            <Link
                                                to={link.to}
                                                className={classNames(
                                                    "relative flex h-full select-none items-center justify-between border-l-2 px-3 py-1 transition-colors",
                                                    isActive
                                                        ? "border-l-[#161616] text-[#161616] dark:border-l-white dark:text-white"
                                                        : "border-l-transparent hover:text-[#161616] dark:hover:text-white",
                                                )}
                                            >
                                                <span className="my-auto text-lg font-medium">
                                                    {t(`navbar.${link.label}`)}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="mt-4 flex flex-col gap-3 border-t border-[#E5E7F2] py-2 px-3 transition-colors dark:border-[#1F2B49]">
                                <LanguageTogglerMobile />

                                <DarkModeTogglerMobile />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
