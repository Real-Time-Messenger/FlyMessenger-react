import { ArrowUpIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { searchActions } from "@/stores/slices/search/search";
import { useTranslation } from "react-i18next";

/**
 * The footer of the message window.
 * The main difference between this component and the {@link MessageFooter} version is
 * that the search does not take place in the {@link SidebarNavigation} component,
 * but inside this component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const MobileMessageFooter = () => {
    const { t } = useTranslation();

    const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(1);

    const isSearching = useStateSelector((state) => state.search.isSearching);
    const searchableMessages = useStateSelector((state) => state.search.searchResults.messages);

    const searchStore = useActionCreators(searchActions);

    const handleSearch = (direction: "next" | "prev") => {
        if (!isSearching || searchableMessages.length === 0) return;

        if (direction === "next") {
            if (currentMessageIndex === searchableMessages.length) return;
            setCurrentMessageIndex((index) => index + 1);
        } else {
            if (currentMessageIndex === 1) return;
            setCurrentMessageIndex(currentMessageIndex - 1);
        }
    };

    useEffect(() => {
        if (!isSearching || searchableMessages.length === 0) return;

        const message = searchableMessages[currentMessageIndex - 1].lastMessage;
        if (!message) return;

        searchStore.setSearchableMessageId(message.id);
    }, [currentMessageIndex, isSearching, searchStore, searchableMessages]);

    useEffect(() => {
        setCurrentMessageIndex(1);
    }, [searchableMessages]);

    return (
        <div className="flex items-center justify-between border-t border-t-[#CFD0D4] py-2 px-4 transition-colors dark:border-t-[#52525240] dark:bg-[#151F38] lg:hidden">
            {isSearching && searchableMessages.length > 0 && (
                <span className="text-sm text-[#888888] transition-colors dark:text-[#7B7B7B]">
                    {t("search.value", { value: currentMessageIndex, total: searchableMessages.length })}
                </span>
            )}

            {isSearching && searchableMessages.length === 0 && (
                <span className="text-sm text-[#888888] transition-colors dark:text-[#7B7B7B]">
                    {t("search.messages.empty")}
                </span>
            )}

            <div className="ml-auto flex gap-3">
                <button
                    className="rounded-full p-1 active:bg-[#C1C1C165] disabled:pointer-events-none disabled:opacity-50 dark:active:bg-[#2F384E65]"
                    disabled={searchableMessages.length === 0 || currentMessageIndex === searchableMessages.length}
                    onClick={() => handleSearch("next")}
                >
                    <ArrowUpIcon className="h-6 w-6" />
                </button>

                <button
                    className="rounded-full p-1 active:bg-[#C1C1C165] disabled:pointer-events-none disabled:opacity-50 dark:active:bg-[#2F384E65]"
                    disabled={searchableMessages.length === 0 || currentMessageIndex === 1}
                    onClick={() => handleSearch("prev")}
                >
                    <ArrowUpIcon className="h-6 w-6 rotate-180" />
                </button>
            </div>
        </div>
    );
};
