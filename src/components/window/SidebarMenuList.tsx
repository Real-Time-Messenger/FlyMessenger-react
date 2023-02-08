import {useTranslation} from "react-i18next";
import {DialogItem} from "../ui/DialogItem";
import {SearchInput} from "../ui/SearchInput";
import {useStateSelector} from "../../stores/hooks";
import {SearchResultList} from "../search/SearchResultList";
import {IDialog} from "../../entities";
import {Loader} from "../ui/Loader";

interface SidebarMenuListProps {
    label: string;
    data: IDialog[];
    status: "init" | "loading" | "success" | "error";
}

export const SidebarMenuList = ({label, data, status}: SidebarMenuListProps) => {
    const {t} = useTranslation();

    const isSearching = useStateSelector((state) => state.search.isSearching)
    const searchableUser = useStateSelector((state) => state.search.selectedUser);
    const searchResults = useStateSelector((state) => state.search.searchResults);

    const isSearchActive = isSearching || typeof searchableUser !== "undefined";

    const unreadMessages = data.reduce((acc, dialog) => acc + (dialog.unreadMessages > 0 ? 1 : 0), 0);

    return (
        <div className="sidebar-list__body h-screen">
            <div className="flex items-center gap-5 p-5 pb-0">
                <span className="text-3xl">{t(label)}</span>

                {unreadMessages > 0 && (
                    <span
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5B9BD9] text-[#EAEDFA] dark:bg-[#416D9C]">{unreadMessages}</span>
                )}
            </div>

            <div className="sidebar-left__content mt-3 gap-3 overflow-hidden">
                <div className="row-span-1 mx-5">
                    <SearchInput/>
                </div>

                {status === "loading" ? (
                    <div className="h-screen flex flex-col items-center justify-center">
                        <Loader className="w-10 h-10"/>
                    </div>
                ) : (
                    <>
                        {isSearchActive && searchResults && (
                            <div className="scroll-y-overlay duration-250 row-span-1 h-full transition-colors">
                                <SearchResultList data={searchResults}/>
                            </div>
                        )}

                        {!isSearchActive && (
                            <>
                                {data.length === 0 && (
                                    <div className="flex flex-col items-center justify-center px-2 text-center">
                                        <span className="text-lg">{t("global.no-dialogs.title")}</span>
                                        <span
                                            className="text-sm text-[#888888] dark:text-[#A6A6A6]">{t("global.no-dialogs.message")}</span>
                                    </div>
                                )}

                                <div className="row-span-1 mx-2.5 mr-2 mb-3 flex flex-col gap-3 overflow-y-auto px-2.5">
                                    {data.map((item) => {
                                        const lastMessage = item.messages[item.messages.length - 1];

                                        return (
                                            <div key={item.id}>
                                                <DialogItem {...item} lastMessage={lastMessage} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}