import { useStateSelector } from "@/stores/hooks";
import { SidebarMenuList } from "@/components/partials/messenger/sidebar/SidebarMenuList";
import { FC } from "react";

/**
 * Renders a list of dialogs is sidebar.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DialogMenu: FC = () => {
    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const status = useStateSelector((state) => state.dialogs.status);

    /**
     * Algorithm for sorting dialogs:
     * 1. Pinned dialogs are always on top.
     * 2. If there is no last message, then the dialog is sorted by the time of the last message.
     */
    const sortedData = dialogs.slice().sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        if (!a.lastMessage && !b.lastMessage) return 0;
        if (!a.lastMessage && b.lastMessage) return 1;
        if (a.lastMessage && !b.lastMessage) return -1;

        if (a.lastMessage?.sentAt && b.lastMessage?.sentAt) {
            return new Date(b.lastMessage.sentAt).getTime() - new Date(a.lastMessage.sentAt).getTime();
        }

        return 0;
    });

    return <SidebarMenuList label="search.dialogs.title" data={sortedData} status={status} />;
};
