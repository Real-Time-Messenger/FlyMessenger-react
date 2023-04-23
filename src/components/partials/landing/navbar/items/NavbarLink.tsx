import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { NavbarLinkProps } from "@/components/partials/landing/navbar/Navbar";

/**
 * Navbar link component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const NavbarLink: FC<NavbarLinkProps> = ({ to, label }) => {
    const { t } = useTranslation();

    const isActive = window.location.pathname === to;

    return (
        <motion.div className="relative px-3" key={label}>
            <Link
                to={to}
                className={classNames(
                    "flex h-full select-none items-center justify-between transition-colors",
                    isActive ? "text-[#161616] dark:text-white" : "hover:text-[#161616] dark:hover:text-white",
                )}
            >
                <span className="my-auto text-lg font-medium">{t(`navbar.${label}`)}</span>

                {isActive && (
                    <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#98BDE7] transition-colors dark:bg-[#1F2B49]"
                    />
                )}
            </Link>
        </motion.div>
    );
};
