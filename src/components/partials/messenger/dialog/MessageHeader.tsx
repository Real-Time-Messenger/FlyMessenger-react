import { IUserInDialog } from "@/entities";
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActionCreators, useAppDispatch, useStateSelector } from "@/stores/hooks";
import { useDebounce, useLastActivityTime } from "@/hooks";
import { searchActions, sendSearchByDialogId } from "@/stores/slices/search/search";
import { ArrowLeftIcon, CloseIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { concatenate } from "@/helpers/helpers";
import classNames from "classnames";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { DialogActionsMenu } from "@/components/partials/messenger/dialog/items/DialogActionsMenu";

/**
 * In this component, we will render the
 * user's online status from a dialog.
 *
 * Also, here we include such a status as - `typing...`
 * That is, we determine when the input field of another user is not empty.
 *
 * If the user's privacy settings `(Privacy -> Last activity)`
 * have the offline status display function disabled, then we will display
 * the current status instead - `last seen recently`.
 *
 * @param {IUserInDialog} user - The User Object from the Dialog.
 *
 * @returns {ReactElement} - The User Status in HTML.
 */
const MessageStatus = (user: IUserInDialog): ReactElement => {
    const { t } = useTranslation();
    const isMeBlocked = useStateSelector((state) => state.dialogs.activeDialog?.isMeBlocked ?? false);

    const { title, value } = useLastActivityTime(typeof user.isOnline === "boolean" ? user.lastActivity : null);

    if (user.isBlocked || isMeBlocked) {
        return <span className="text-xs text-[#3F3F3F] dark:text-[#A6A6A6]">{t("lastSeenForALongTime")}</span>;
    }

    if (user.isTyping && user.isOnline) {
        return <span className="text-xs text-[#7CADE0] dark:text-[#7CADE0]">{t("users.status.typing")}</span>;
    }

    if (user.isOnline && !user.isTyping) {
        return <span className="text-xs text-[#7CADE0] dark:text-[#7CADE0]">{t("users.status.online")}</span>;
    }

    return <span className="text-xs text-[#3F3F3F] dark:text-[#A6A6A6]">{title && t(title, { value })}</span>;
};

/**
 * The header of the message window.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const MessageHeader: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");

    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);
    // const user = dialogs.find((dialog) => dialog.id === activeDialog?.id)?.user;
    const user = activeDialog?.user;

    const searchRef = useRef<HTMLInputElement>(null);

    const searchableUser = useStateSelector((state) => state.search.selectedUser);
    const isMobileUserSearching = useStateSelector((state) => state.search.selectedMobileUser?.id) === user?.id;

    const isMobileSidebarOpened = useStateSelector((state) => state.sidebar.isMobileSidebarOpened);

    const searchStore = useActionCreators(searchActions);
    const sidebarStore = useActionCreators(sidebarActions);

    const debouncedValue = useDebounce<string>(searchValue, 500);

    const dispatch = useAppDispatch();

    const clearSearch = () => {
        if (!searchRef.current) return;

        setSearchValue("");
        searchStore.clearSearchResults();

        searchRef.current.focus();
    };

    useEffect(() => {
        if (!activeDialog || searchValue.length === 0) return;

        dispatch(sendSearchByDialogId({ dialogId: activeDialog.id, searchQuery: debouncedValue }));
    }, [activeDialog, debouncedValue, dispatch, searchValue.length]);

    if (!user) return null;
    return (
        <>
            {isMobileUserSearching && (
                <div className="relative flex h-[62px] w-full items-center gap-3 whitespace-nowrap border-b border-b-[#CFD0D4] bg-[#FFFFFF] p-2 transition-colors dark:border-b-[#52525240] dark:bg-[#151F38] lg:hidden">
                    <button
                        className={classNames(
                            "flex rounded-full p-2 transition active:bg-[#C1C1C165] dark:active:bg-[#2F384E65] lg:hidden",
                            isMobileSidebarOpened && "rotate-180",
                        )}
                        onClick={() => searchStore.clearMobileSearch()}
                    >
                        <ArrowLeftIcon className="h-6 w-6 stroke-[1.5]" />
                    </button>

                    <input
                        ref={searchRef}
                        type="text"
                        className="flex-1 rounded-full bg-[#F2F2F2] py-2 pl-4 pr-11 text-[#3F3F3F] placeholder-[#3F3F3F] focus:outline-none dark:bg-[#2F384E] dark:text-[#A6A6A6] dark:placeholder-[#A6A6A6]"
                        autoFocus
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    {searchValue && (
                        <button
                            className="absolute top-1/2 right-0 flex -translate-x-1/4 -translate-y-1/2 rounded-full p-2 transition active:bg-[#C1C1C165] dark:active:bg-[#2F384E65]"
                            onClick={clearSearch}
                        >
                            <CloseIcon className="h-6 w-6 stroke-[1.5]" />
                        </button>
                    )}
                </div>
            )}

            <div
                className={classNames(
                    "w-full items-center gap-3 whitespace-nowrap border-b border-b-[#CFD0D4] bg-[#FFFFFF] p-2 transition-colors dark:border-b-[#52525240] dark:bg-[#151F38]",
                    isMobileUserSearching ? "hidden lg:flex" : "flex",
                )}
            >
                <button
                    className={classNames(
                        "flex rounded-full p-2 transition active:bg-[#C1C1C165] dark:active:bg-[#2F384E65] lg:hidden",
                        isMobileSidebarOpened && "rotate-180",
                    )}
                    onClick={() => sidebarStore.toggleMobileSidebar(!isMobileSidebarOpened)}
                >
                    <ArrowLeftIcon className="h-6 w-6 stroke-[1.5]" />
                </button>

                <Avatar
                    src={user.photoURL}
                    alt={concatenate(user.firstName, user.lastName)}
                    className="h-[45px] w-[45px] rounded-full"
                />

                <div className="flex flex-1 flex-col">
                    <span>{concatenate(user.firstName, user.lastName)}</span>

                    <MessageStatus {...user} />
                </div>

                <div className="relative flex items-center">
                    <DialogActionsMenu isUserSearching={typeof searchableUser !== "undefined"} user={user} />
                </div>
            </div>
        </>
    );
};
