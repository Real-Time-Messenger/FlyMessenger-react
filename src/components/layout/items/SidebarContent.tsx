import { LogoIcon } from "../../icons";
import {motion} from "framer-motion";
import {useActionsCreators, useStateSelector} from "../../../stores/hooks";
import { SidebarLinks } from "./SidebarLinks";
import { Avatar } from "../../ui/Avatar";
import { concatenate } from "../../../helpers/helpers";
import {settingsActions} from "../../../stores/slices/ui/settings/settings";

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

export const SidebarContent = () => {
    const isSidebarOpened = useStateSelector((state) => state.sidebar.isSidebarOpened);
    const user = useStateSelector((state) => state.user.current);

    const settingsStore = useActionsCreators(settingsActions);

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
                    className="rounded-full aspect-square w-8 h-8 flex-none"
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
    )
}