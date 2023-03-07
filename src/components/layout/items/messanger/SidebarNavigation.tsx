import {FC, useEffect, useRef} from "react";
import {useHover} from "../../../../hooks/useHover";
import {motion} from 'framer-motion';
import {useActionsCreators} from "../../../../stores/hooks";
import {sidebarActions} from "../../../../stores/slices/ui/sidebar/sidebar";
import {SidebarContent} from "./SidebarContent";
import {DarkenedBackground} from "../../extra/DarkenedBackground";
import {DialogsMenu} from "../../../list/pages/DialogsMenu";

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


export const SidebarNavigation: FC = () => {
    const actions = useActionsCreators(sidebarActions);

    const hoverRef = useRef<HTMLDivElement>(null);
    const isHovered = useHover(hoverRef);

    useEffect(() => {
        actions.toggleSidebar({state: isHovered});
    }, [isHovered]);

    return (
        <div className="relative z-auto h-full">
            <DarkenedBackground isDarkened={isHovered}/>

            <motion.div
                variants={sidebarExpansion}
                initial="collapsed"
                animate={isHovered ? "expanded" : "collapsed"}
                ref={hoverRef}
                className="duration-250 absolute top-0 left-0 z-[2] flex h-full select-none flex-col overflow-hidden bg-[#EAEDFA] pt-5 transition-colors dark:bg-[#10182B]"
            >
                <SidebarContent/>
            </motion.div>

            <div
                className="duration-250 ml-[70px] flex h-full w-[290px] flex-col border-r border-r-[#CFD0D4] bg-[#FFFFFF] transition-colors dark:border-r-[#52525240] dark:bg-[#151F38] md:w-[290px] lg:w-[340px] xl:w-[390px]">
                <DialogsMenu/>
            </div>
        </div>
    )
}