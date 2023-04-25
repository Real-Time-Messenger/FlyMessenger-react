import { ISearchResult } from "@/interfaces/response";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActionCreators, useAppDispatch, useStateSelector } from "@/stores/hooks";
import { searchActions } from "@/stores/slices/search/search";
import { createDialog, dialogActions } from "@/stores/slices/dialogs/dialogs";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { concatenate } from "@/helpers/helpers";
import { CloseIcon } from "@/components/icons";
import { DialogItem } from "@/components/ui/messenger/dialog/DialogItem";
import { UserInSearchItem } from "@/components/search/items/UserInSearchItem";
import { MessageInSearchItem } from "@/components/search/items/MessageInSearchItem";
import {sidebarActions} from "@/stores/slices/ui/sidebar/sidebar";

/**
 * Props for the {@link SearchResultList} component.
 *
 * @interface
 *
 * @property {ISearchResult | undefined} data - The search result data.
 */
interface SearchResultListProps {
    data: ISearchResult | undefined;
}

/**
 * Props for the {@link SearchItems} component.
 *
 * @interface SearchResultItemProps
 *
 * @property {ISearchResult["dialogs"] | ISearchResult["messages"] | ISearchResult["users"]} data - The search result data.
 * @property {string} label - The label for the search result.
 * @property {string} emptyLabel - The label for the empty search result.
 * @property {(id: string) => void} onClick - The click handler for the search result.
 * @property {FC<any>} Component - The component for the search result.
 * @property {string} activeId - The active id for the search result.
 */
interface SearchResultItemProps {
    data: ISearchResult["dialogs"] | ISearchResult["messages"] | ISearchResult["users"];
    label: string;
    emptyLabel: string;
    onClick?: (id: string) => void;
    Component: FC<any>;
    activeId?: string;
}

/**
 * Search result item component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
const SearchItems: FC<SearchResultItemProps> = ({ data, label, emptyLabel, onClick, Component, activeId }) => {
    const { t } = useTranslation();

    if (typeof data === "undefined") return null;

    const Content = () => {
        if (data.length === 0) {
            return (
                <div className="my-2 flex flex-col items-center justify-center">
                    <span className="text-[#A0A0A0] dark:text-[#A0A0A0]">{t(emptyLabel)}</span>
                </div>
            );
        }

        return (
            <div className="mt-3 flex flex-col gap-3 px-3 xl:px-5">
                {data.map((dialog, index) => (
                    <Component key={index} onClick={onClick} activeId={activeId} {...dialog} />
                ))}
            </div>
        );
    };

    return (
        <div className="mb-3 flex flex-col">
            <div className="sticky top-0 z-[1] select-none bg-[#EAEDFA] p-1.5 transition-colors dark:bg-[#10182B]">
                <span>{t(label)}</span>
            </div>

            <Content />
        </div>
    );
};

/**
 * Renders the search result list.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SearchResultList: FC<SearchResultListProps> = ({ data }: SearchResultListProps) => {
    const { t } = useTranslation();

    const [activeId, setActiveId] = useState<string>("");

    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);
    const searchableUser = useStateSelector((state) => state.search.selectedUser);

    const sidebarStore = useActionCreators(sidebarActions);
    const searchStore = useActionCreators(searchActions);
    const dialogStore = useActionCreators(dialogActions);

    const dispatch = useAppDispatch();

    /**
     * Clears the selected user instance.
     */
    const clearUserInstance = (): void => {
        searchStore.setSearchableUser(undefined);
    };

    /**
     * Sets the observed message ID.
     *
     * @param {string} id - The message ID.
     */
    const setObservedMessage = (id: string): void => {
        setActiveId(id);

        const dialog = dialogs.find((dialog) => dialog.messages.find((message) => message.id === id));
        if (dialog && dialog.id !== activeDialog?.id) {
            dialogStore.setActiveDialog({ id: dialog.id });
        }

        searchStore.setSearchableMessageId(id);

        sidebarStore.toggleMobileSidebar(false);
    };

    /**
     * Creates a dialog with the specified user.
     *
     * @param {string} userId - The user ID.
     */
    const createDialogQuery = async (userId: string): Promise<void> => {
        const dialog = dialogs.find((dialog) => dialog.user.id === userId);
        if (!dialog) {
            dispatch(createDialog({ toUserId: userId }));
            return;
        }

        dialogStore.setActiveDialog({ id: dialog.id });
        searchStore.setSearchableMessageId(null);
    };

    return (
        <div className="flex flex-1 flex-col">
            {searchableUser && (
                <>
                    <div className="bg-[#EAEDFA] p-1.5 transition-colors dark:bg-[#10182B]">
                        <span>{t("search.searchMessagesIn")}</span>
                    </div>

                    <div className="my-2 flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-3 py-1">
                            <Avatar
                                src={searchableUser.photoURL}
                                alt={concatenate(searchableUser.firstName, searchableUser.lastName)}
                                className="h-10 w-10 rounded-full"
                            />

                            <span className="flex-1">
                                {concatenate(searchableUser.firstName, searchableUser.lastName)}
                            </span>

                            <button
                                className="cursor-pointer rounded-full p-2 text-[#4C4C4C] transition-colors hover:text-[#161616] dark:text-[#7B7B7B] dark:hover:text-[#FFFFFF]"
                                onClick={clearUserInstance}
                            >
                                <CloseIcon className="h-6 w-6 stroke-[1.5]" />
                            </button>
                        </div>
                    </div>
                </>
            )}

            {!searchableUser && (
                <>
                    <SearchItems
                        data={data?.dialogs}
                        label="search.dialogs.title"
                        emptyLabel="search.dialogs.empty"
                        Component={DialogItem}
                    />

                    <SearchItems
                        data={data?.users}
                        label="search.users.title"
                        emptyLabel="search.users.empty"
                        Component={UserInSearchItem}
                        onClick={(id) => createDialogQuery(id)}
                    />
                </>
            )}

            <SearchItems
                Component={MessageInSearchItem}
                data={data?.messages}
                label="search.messages.title"
                emptyLabel="search.messages.empty"
                onClick={(id) => setObservedMessage(id)}
                activeId={activeId}
            />
        </div>
    );
};
