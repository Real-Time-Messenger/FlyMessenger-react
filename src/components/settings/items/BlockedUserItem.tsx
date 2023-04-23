import { Avatar } from "@/components/ui/messenger/Avatar";
import { FC } from "react";
import { IBlockedUser } from "@/entities";
import { useTranslation } from "react-i18next";
import { useActionCreators, useAppDispatch } from "@/stores/hooks";
import { dialogActions } from "@/stores/slices/dialogs/dialogs";
import { blockOrUnblockUser } from "@/stores/slices/user/user";
import { concatenate } from "@/helpers/helpers";

/**
 * Blocked user item in the {@link BlockedUsersPage} component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const BlockedUserItem: FC<IBlockedUser> = ({ id, username, firstName, lastName, photoURL }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const dialogStore = useActionCreators(dialogActions);

    /**
     * Unblock the user.
     */
    const pardonUser = (): void => {
        dispatch(blockOrUnblockUser({ blacklistedUserId: id }))
            .unwrap()
            .then(() => dialogStore.blockUser({ userId: id, isBlocked: false }));
    };

    return (
        <div className="flex items-center gap-3 rounded-lg bg-[#98BDE7] p-3 dark:bg-[#1F2B49]">
            <Avatar src={photoURL} alt={username} className="h-10 w-10 rounded-full" />

            <div className="flex flex-1 flex-col justify-between">
                <span>{concatenate(firstName, lastName)}</span>

                <span className="select-none text-xs text-[#4C4C4C] dark:text-[#40465A]">@{username}</span>
            </div>

            <div className="flex items-center">
                <span
                    className="cursor-pointer truncate text-sm text-[#1D4ED8] hover:underline dark:text-[#4C70E0]"
                    onClick={pardonUser}
                >
                    {t("users.unblock")}
                </span>
            </div>
        </div>
    );
};
