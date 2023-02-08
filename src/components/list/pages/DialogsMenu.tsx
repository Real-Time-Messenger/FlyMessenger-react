import {SidebarMenuList} from "../../window/SidebarMenuList";
import {useStateSelector} from "../../../stores/hooks";

export const DialogsMenu = () => {
    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const status = useStateSelector((state) => state.dialogs.status);

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

    return (
        <SidebarMenuList
            label="search.dialogs.title"
            data={sortedData}
            status={status}
        />
    )
}