import classNames from "classnames";
import { useTranslation } from "react-i18next";
import {concatenate, parseDateToTime} from "../../../helpers/helpers";
import { Avatar } from "../../ui/Avatar";
import { ReadStatusIcon } from "../../ui/DialogItem";
import {IDialog} from "../../../entities";

/**
 * Interface of the `DialogItem` component in the Search.
 */
interface DialogItemPropsInSearch extends IDialog {
    onClick: (id: string) => void;
    activeId: string;
}

export const MessageInSearchItem = ({ onClick, lastMessage, user, activeId }: DialogItemPropsInSearch) => {
    const { t } = useTranslation();

    const isActive = lastMessage?.id === activeId;

    /**
     * Toggles the Observed Message.
     */
    const selectMessage = (): void => {
        if (!lastMessage || !lastMessage.id) return;

        onClick(lastMessage.id);
    };

    const classes = classNames("w-full p-2 rounded-lg transition-colors duration-250 cursor-pointer flex items-center gap-2.5 overflow-hidden select-none", isActive ? "bg-[#98BDE7] dark:bg-[#416D9C]" : "bg-[#EAEDFA] hover:bg-[#CAD5F2] dark:bg-[#1F2B49] dark:hover:bg-[#416D9C50]");

    return (
        <div
            onClick={selectMessage}
            className={classes}
        >
            <div className="flex h-full min-h-[48px] w-min min-w-[48px] items-center justify-center">
                <Avatar
                    src={lastMessage?.sender.photoURL}
                    alt={concatenate(user.firstName, user.lastName)}
                    className="rounded-full w-12 h-12"
                />
            </div>

            <div className="flex flex-1 flex-col gap-1 overflow-hidden transition-none">
                <div className="flex items-center justify-between gap-2 truncate">
                    <span className="truncate dark:text-[#FFFFFF]">{concatenate(lastMessage?.sender.firstName, lastMessage?.sender.lastName)}</span>

                    <div className="flex flex-auto items-start justify-end gap-1">
                        <ReadStatusIcon
                            {...user}
                            lastMessage={lastMessage}
                            isActive={isActive}
                        />

                        <span className={classNames("text-[13px]", isActive ? "text-[#303030] dark:text-[#FFFFFF]" : "text-[#4C4C4C] dark:text-[#AFAFAF]")}>{lastMessage && parseDateToTime(lastMessage.sentAt)}</span>
                    </div>
                </div>

                <div className="flex">
                    <span className={classNames("h-10 flex-1 break-all text-sm line-clamp-2", isActive ? "text-[#303030] dark:text-[#FFFFFF]" : "text-[#4C4C4C] dark:text-[#AFAFAF]")}>{lastMessage ? lastMessage.text : t("messages.first")}</span>
                </div>
            </div>
        </div>
    );
};
