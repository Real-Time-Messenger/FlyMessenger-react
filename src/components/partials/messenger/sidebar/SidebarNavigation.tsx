import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { FC, useEffect, useRef } from "react";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { useHover } from "@/hooks";
import { DarkenedBackground } from "@/components/layouts/extra/DarkenedBackground";
import { DialogMenu } from "@/components/partials/messenger/sidebar/menus/DialogMenu";
import { motion } from "framer-motion";
import classNames from "classnames";
import { SidebarContent } from "@/components/partials/messenger/sidebar/SidebarContent";

/**
 * Framer-motion animation for the {@link SidebarNavigation} component, which is used to animate the sidebar width when it is opened.
 */
const sidebarExpansion = {
    expanded: {
        width: 240,
        transition: {
            duration: 0.25,
        },
    },
    collapsed: {
        width: 70,
        transition: {
            duration: 0.25,
        },
    },
};

/**
 * The sidebar navigation component, which contains the sidebar content and dialogs menu.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SidebarNavigation: FC = () => {
    const isMobileSidebarOpened = useStateSelector((state) => state.sidebar.isMobileSidebarOpened);

    const sidebarStore = useActionCreators(sidebarActions);

    const hoverRef = useRef<HTMLDivElement>(null);
    const isHovered = useHover(hoverRef);

    useEffect(() => {
        sidebarStore.toggleSidebar(isHovered);
    }, [isHovered, sidebarStore]);

    return (
        <div className="relative z-auto h-full">
            <DarkenedBackground isDarkened={isHovered} />

            <motion.div
                variants={sidebarExpansion}
                initial="collapsed"
                animate={isHovered ? "expanded" : "collapsed"}
                ref={hoverRef}
                className="absolute top-0 left-0 z-[2] hidden h-full select-none flex-col overflow-hidden bg-[#EAEDFA] pt-5 transition-colors dark:bg-[#10182B] lg:flex"
            >
                <SidebarContent />
            </motion.div>

            <div
                className={classNames(
                    "flex h-full flex-col bg-[#FFFFFF] transition-all dark:border-r-[#52525240] dark:bg-[#151F38] md:border-r md:border-r-[#CFD0D4]",
                    {
                        "w-screen sm:w-[390px] lg:ml-[70px] lg:w-[390px]": isMobileSidebarOpened,
                        "w-0 md:w-0 lg:ml-[70px] lg:w-[390px]": !isMobileSidebarOpened,
                    },
                )}
            >
                <DialogMenu />
            </div>
        </div>
    );
};
