import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { useStateSelector } from "@/stores/hooks";
import { MessageHeader } from "@/components/partials/messenger/dialog/MessageHeader";
import { MessageFooter } from "@/components/partials/messenger/dialog/MessageFooter";

/**
 * Layout for the message window. Contains a header, a main window with messages, and a field for entering a message.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const MessagingLayout: FC<ChildrenProps> = ({ children }) => {
    const { t } = useTranslation();
    const hasActiveDialog = !!useStateSelector((state) => state.dialogs.activeDialog);

    if (!hasActiveDialog) {
        return (
            <div className="flex w-screen flex-1 flex-col items-center justify-center bg-[#EAEDFA] transition-colors dark:bg-[#10182B]">
                <span className="select-none rounded-full bg-[#DCE1F0] py-0.5 px-4 text-sm text-[#3F3F3F] transition-colors dark:bg-[#1F2B49] dark:text-[#A6A6A6]">
                    {t("messages.selectChat")}
                </span>
            </div>
        );
    }

    return (
        <div className="flex w-screen flex-1 flex-col overflow-hidden">
            <MessageHeader />

            <div className="flex-1 overflow-hidden bg-[#EAEDFA] transition-colors dark:bg-[#10182B] w-screen lg:w-auto">{children}</div>

            <MessageFooter />
        </div>
    );
};
