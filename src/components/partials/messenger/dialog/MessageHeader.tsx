import { IUserInDialog } from "@/entities";
import { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { useLastActivityTime } from "@/hooks";
import { searchActions } from "@/stores/slices/search/search";
import { dialogActions } from "@/stores/slices/dialogs/dialogs";
import { ArrowLeftIcon, SearchIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { concatenate } from "@/helpers/helpers";
import classNames from "classnames";

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
    const dialogs = useStateSelector((state) => state.dialogs.dialogs);
    const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);
    const user = dialogs.find((dialog) => dialog.id === activeDialog?.id)?.user;

    const isUserSearching = useStateSelector((state) => state.search.selectedUser?.id) === user?.id;

    const searchStore = useActionCreators(searchActions);
    const dialogStore = useActionCreators(dialogActions);

    if (!user) return null;
    return (
        <div className="flex w-full items-center gap-3 border-b border-b-[#CFD0D4] bg-[#FFFFFF] p-2 transition-colors dark:border-b-[#52525240] dark:bg-[#151F38]">
            <button
                className="flex rounded-full p-2 transition-[background-color] active:bg-[#C1C1C165] dark:active:bg-[#2F384E65] lg:hidden"
                onClick={() => dialogStore.setActiveDialog(null)}
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

            <div className="flex items-center px-4">
                <button
                    className={classNames(
                        "flex items-center justify-center rounded-full p-2 transition-[background-color] hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65]",
                        isUserSearching && "bg-[#C1C1C165] dark:bg-[#2F384E65]",
                    )}
                    onClick={() => searchStore.setSearchableUser(user)}
                >
                    <SearchIcon className="h-6 w-6 stroke-[2]" />
                </button>
            </div>
        </div>
    );
};
