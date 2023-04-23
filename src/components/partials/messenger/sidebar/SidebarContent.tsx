import { motion } from "framer-motion";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { SidebarLinks } from "./SidebarLinks";
import { concatenate } from "@/helpers/helpers";
import { settingsActions } from "@/stores/slices/ui/settings/settings";
import { LogoIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { FC } from "react";

/**
 * Framer-motion animation for the {@link SidebarContent} text, which is used to animate the text when the sidebar is opened.
 */
export const textSwipe = {
    hidden: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.2,
        },
        transitionEnd: {
            display: "none",
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        display: "block",
    },
};

/**
 * The sidebar content component, which contains the sidebar links.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SidebarContent: FC = () => {
    const isSidebarOpened = useStateSelector((state) => state.sidebar.isSidebarOpened);
    const user = useStateSelector((state) => state.user.current);

    const settingsStore = useActionCreators(settingsActions);

    return (
        <div className="flex h-full flex-col justify-between overflow-hidden">
            <div className="flex w-full items-center justify-between gap-4 whitespace-nowrap px-[19px]">
                <LogoIcon className="h-8 w-8 flex-none stroke-2" />

                <motion.span
                    variants={textSwipe}
                    initial="hidden"
                    animate={isSidebarOpened ? "visible" : "hidden"}
                    className="flex-1 whitespace-nowrap text-xl"
                >
                    Fly Messenger
                </motion.span>
            </div>

            <SidebarLinks />

            <div
                className="mb-2.5 flex w-full cursor-pointer items-center justify-between gap-6 whitespace-nowrap px-[19px] py-2.5 hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65]"
                onClick={() => settingsStore.toggleSettings()}
            >
                <Avatar
                    src={user.photoURL}
                    alt={concatenate(user.firstName, user.lastName)}
                    className="aspect-square h-8 w-8 flex-none rounded-full"
                />

                <motion.span
                    variants={textSwipe}
                    initial="hidden"
                    animate={isSidebarOpened ? "visible" : "hidden"}
                    className="flex-1 truncate whitespace-nowrap text-sm"
                    title={concatenate(user.firstName, user.lastName)}
                >
                    {concatenate(user.firstName, user.lastName)}
                </motion.span>
            </div>
        </div>
    );
};
