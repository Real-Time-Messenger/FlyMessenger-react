import { IDialog, IUser } from "@/entities";
import { FC } from "react";
import { useStateSelector } from "@/stores/hooks";
import classNames from "classnames";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { concatenate } from "@/helpers/helpers";

/**
 * Props for the {@link UserInSearchItem} component.
 *
 * @interface UserInSearchItemProps
 *
 * @extends {IUser}
 *
 * @property {(id: string) => void} onClick - The function to toggle the user.
 */
interface UserInSearchItemProps extends IDialog {
    onClick: (dialog: IDialog) => void;
}

/**
 * Renders the user component in the search.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const UserInSearchItem: FC<UserInSearchItemProps> = ({ id, user, onClick, ...dialogProps }) => {
    const activeDialog = useStateSelector((state) => state.dialogs.activeDialog);
    const isActive = (activeDialog && (activeDialog.id === id || activeDialog.user.id === id)) || false;

    const classes = classNames(
        "w-full p-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2.5 overflow-hidden select-none",
        isActive
            ? "bg-[#98BDE7] dark:bg-[#416D9C]"
            : "bg-[#EAEDFA] hover:bg-[#CAD5F2] dark:bg-[#1F2B49] dark:hover:bg-[#416D9C50]",
    );

    return (
        <div className={classes} onClick={() => onClick({ id, user, ...dialogProps })}>
            <div className="flex h-full min-h-[48px] w-min min-w-[48px] items-center justify-center">
                <Avatar
                    src={user.photoURL}
                    alt={concatenate(user.firstName, user.lastName)}
                    className="h-12 w-12 rounded-full"
                />
            </div>

            <div className="flex flex-1 flex-col gap-1 overflow-hidden transition-none">
                <span className="truncate dark:text-[#FFFFFF]">{concatenate(user.firstName, user.lastName)}</span>

                <div className="flex">
                    <span
                        className={classNames(
                            "mt-2.5 inline-block truncate align-baseline text-sm",
                            isActive ? "text-[#303030] dark:text-[#FFFFFF]" : "text-[#4C4C4C] dark:text-[#AFAFAF]",
                        )}
                    >
                        @{user.username}
                    </span>
                </div>
            </div>
        </div>
    );
};
