import {FC, useState} from "react";
import {useActionsCreators, useAppDispatch, useStateSelector} from "../../stores/hooks";
import {useTranslation} from "react-i18next";
import {searchActions} from "../../stores/slices/search/search";
import {Avatar} from "../ui/Avatar";
import {concatenate} from "../../helpers/helpers";
import {CloseIcon} from "../icons";
import {DialogItem} from "../ui/DialogItem";
import {UserInSearchItem} from "./items/UserInSearchItem";
import {MessageInSearchItem} from "./items/MessageInSearchItem";
import {createDialog, dialogsActions} from "../../stores/slices/dialogs/dialogs";
import {ISearchResult} from "../../interfaces/response";

/**
 * Interface to Represent `SearchResultList` List as `data` prop.
 */
interface SearchResultListProps {
    data: ISearchResult | undefined;
}

/**
 * Interface for the `SearchResultList` component props.
 */
interface SearchResultItemProps {
    data: ISearchResult["dialogs"] | ISearchResult["messages"] | ISearchResult["users"];
    label: string;
    emptyLabel: string;
    onClick?: (id: string) => void;
    Component: FC<any>;
    activeId?: string;
}

const SearchItems = ({data, label, emptyLabel, onClick, Component, activeId}: SearchResultItemProps) => {
    const {t} = useTranslation();

    if (typeof data === "undefined") return null;

    const Content = () => {
        if (data.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center my-2">
                    <span className="text-[#A0A0A0] dark:text-[#A0A0A0]">
                        {t(emptyLabel)}
                    </span>
                </div>
            );
        }

        return (
            <div className="mt-3 flex flex-col gap-3 px-3 xl:px-5">
                {data.map((dialog, index) => (
                    <Component
                        key={index}
                        {...dialog}
                        onClick={onClick}
                        activeId={activeId}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="mb-3 flex flex-col">
            <div className="duration-250 sticky top-0 z-[1] bg-[#EAEDFA] p-1.5 transition-colors dark:bg-[#10182B] select-none">
                <span>{t(label)}</span>
            </div>

            <Content />
        </div>
    );
};

export const SearchResultList: FC<SearchResultListProps> = ({data}: SearchResultListProps) => {
    const {t} = useTranslation();

    const [activeId, setActiveId] = useState<string>("");

    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);
    const searchableUser = useStateSelector((state) => state.search.selectedUser);

    const searchStore = useActionsCreators(searchActions);
    const dialogsStore = useActionsCreators(dialogsActions);
    const dispatch = useAppDispatch();

    const clearUserInstance = () => {
        searchStore.setSearchableUser(undefined);
    };

    const setObservedMessage = (id: string) => {
        setActiveId(id);

        // find the dialog of the message
        const dialog = dialogs.find((dialog) => dialog.messages.find((message) => message.id === id));
        if (dialog && dialog.id !== activeDialog?.id) {
            dialogsStore.setActiveDialog({id: dialog.id});
        }

        searchStore.setSearchableMessageId(id);
    };

    /**
     * Creates a new Dialog with the User on Click.
     *
     * @async
     *
     * @param {string} userId - ID of the User to Create a Dialog with.
     */
    const createDialogQuery = async (userId: string): Promise<void> => {
        const dialog = dialogs.find((dialog) => dialog.user.id === userId);
        if (!dialog) {
            dispatch(createDialog({toUserId: userId}))
            return;
        }

        dialogsStore.setActiveDialog({id: dialog.id});
        searchStore.setSearchableMessageId(null);
    };

    return (
        <div className="flex flex-1 flex-col">
            {searchableUser && (
                <>
                    <div className="duration-250 bg-[#EAEDFA] p-1.5 transition-colors dark:bg-[#10182B]">
                        <span>{t("search.searchMessagesIn")}</span>
                    </div>

                    <div className="my-2 flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-3 py-1">
                            <Avatar
                                src={searchableUser.photoURL}
                                alt={concatenate(searchableUser.firstName, searchableUser.lastName)}
                                className="rounded-full w-10 h-10"
                            />

                            <span
                                className="flex-1">{concatenate(searchableUser.firstName, searchableUser.lastName)}</span>

                            <button
                                className="duration-250 cursor-pointer rounded-full p-2 text-[#4C4C4C] transition-colors hover:text-[#161616] dark:text-[#7B7B7B] dark:hover:text-[#FFFFFF]"
                                onClick={clearUserInstance}
                            >
                                <CloseIcon className="h-6 w-6 stroke-[1.5]"/>
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
