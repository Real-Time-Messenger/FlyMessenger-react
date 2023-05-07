import { IDialog } from "@/entities";
import { useTranslation } from "react-i18next";
import { useStateSelector } from "@/stores/hooks";
import { useDocumentTitle } from "@/hooks";
import { HamburgerMenuIcon } from "@/components/icons";
import { SearchInput } from "@/components/ui/messenger/SearchInput";
import { Loader } from "@/components/ui/messenger/Loader";
import { SearchResultList } from "@/components/search/SearchResultList";
import { DialogItem, PositionProps } from "@/components/ui/messenger/dialog/DialogItem";
import { FC, useState } from "react";
import { MobileSidebarContent } from "@/components/partials/messenger/sidebar/SidebarContent";

/**
 * Props for the {@link SidebarMenuList}.
 *
 * @interface SidebarMenuListProps
 *
 * @property {string} label - The label for the title.
 * @property {IDialog[]} data - The data for the list.
 * @property {"init" | "loading" | "success" | "error"} status - The status of the list.
 */
interface SidebarMenuListProps {
    label: string;
    data: IDialog[];
    status: "init" | "loading" | "success" | "error";
}

/**
 * Renders wrapped (search input, title, etc.) content inside a sidebar.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SidebarMenuList: FC<SidebarMenuListProps> = ({ label, data, status }) => {
    const { t } = useTranslation();

    const isSearching = useStateSelector((state) => state.search.isSearching);
    const searchableUser = useStateSelector((state) => state.search.selectedUser);
    const searchResults = useStateSelector((state) => state.search.searchResults);

    const unreadMessages = data.reduce((acc, dialog) => acc + (dialog.unreadMessages > 0 ? 1 : 0), 0);

    const title = unreadMessages > 0 ? `(${unreadMessages}) ${t("global.title")}` : t("global.title");

    useDocumentTitle(title);

    return (
        <div className="sidebar-list__body grid h-screen grid-rows-[auto_2fr] overflow-hidden">
            <div className="hidden items-center gap-5 p-5 pb-0 lg:flex">
                <span className="text-3xl">{t(label)}</span>

                {unreadMessages > 0 && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5B9BD9] text-[#EAEDFA] dark:bg-[#416D9C]">
                        {unreadMessages}
                    </span>
                )}
            </div>

            <div className="mb-2 flex gap-2 border-b border-b-[#CFD0D4] px-2 pt-2 pb-2 pr-5 dark:border-t-[#2F384E20] lg:hidden">
                <MobileSidebarContent />

                <SearchInput />
            </div>

            <div className="sidebar-left__content mt-3 gap-3 overflow-hidden">
                <div className="row-span-1 mx-5 hidden lg:flex">
                    <SearchInput />
                </div>

                {status === "loading" ? (
                    <div className="flex h-screen flex-col items-center justify-center">
                        <Loader className="h-10 w-10" />
                    </div>
                ) : (
                    <>
                        {isSearching || typeof searchableUser !== "undefined" ? (
                            <div className="scroll-y-overlay row-span-1 h-full transition-colors">
                                <SearchResultList data={searchResults} />
                            </div>
                        ) : (
                            <>
                                {data.length === 0 && (
                                    <div className="flex flex-col items-center justify-center px-2 text-center">
                                        <span className="text-lg">{t("global.no-dialogs.title")}</span>
                                        <span className="text-sm text-[#888888] dark:text-[#A6A6A6]">
                                            {t("global.no-dialogs.message")}
                                        </span>
                                    </div>
                                )}

                                <div className="row-span-1 mx-2.5 mr-2 mb-3 flex flex-col gap-3 overflow-y-auto px-2.5">
                                    {data.map((item) => {
                                        const lastMessage = item.messages[item.messages.length - 1];

                                        return (
                                            <div key={item.id}>
                                                <DialogItem {...item} lastMessage={lastMessage} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
