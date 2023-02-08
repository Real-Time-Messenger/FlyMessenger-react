import {ChildrenProps} from "../../interfaces/ChildrenProps";
import {MessageHeader} from "./items/MessageHeader";
import {MessageFooter} from "./items/MessageFooter";
import {useStateSelector} from "../../stores/hooks";
import {useTranslation} from "react-i18next";

export const MessagingWindow = ({children}: ChildrenProps) => {
    const {t} = useTranslation();
    const hasActiveDialog = !!useStateSelector((state) => state.dialogs.activeDialog);

    if (!hasActiveDialog) {
        return (
            <div className="duration-250 flex flex-1 flex-col items-center justify-center bg-[#EAEDFA] transition-colors dark:bg-[#10182B]">
                <span className="duration-250 select-none rounded-full bg-[#DCE1F0] py-0.5 px-4 text-sm text-[#3F3F3F] transition-colors dark:bg-[#1F2B49] dark:text-[#A6A6A6]">{t("messages.selectChat")}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col">
            <MessageHeader />

            <div className="duration-250 flex-1 overflow-hidden bg-[#EAEDFA] transition-colors dark:bg-[#10182B]">{children}</div>

            <MessageFooter />
        </div>
    )
}