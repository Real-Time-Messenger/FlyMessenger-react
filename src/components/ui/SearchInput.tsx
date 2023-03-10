import classNames from "classnames";
import {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../hooks/useDebounce";
import {CloseIcon, SearchIcon } from "../icons";
import {useActionsCreators, useAppDispatch, useStateSelector} from "../../stores/hooks";
import {searchActions, sendSearch, sendSearchByDialogId} from "../../stores/slices/search/search";

export const SearchInput = () => {
    const [value, setValue] = useState<string>("");

    const { t } = useTranslation();

    const actions = useActionsCreators(searchActions);
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const isUserSelected = !!useStateSelector((state) => state.search.selectedUser);
    const activeDialogId = useStateSelector((state) => state.dialogs.activeDialog?.id);

    const debouncedValue = useDebounce<string>(value, 500);
    const valueIsEmpty = value === "";

    const buttonClassesBase = classNames("absolute top-0 flex p-3 items-center justify-center outline-none stroke-[1.5]", valueIsEmpty ? "text-[#888888] dark:text-[#7B7B7B]" : "text-[#161616] dark:text-[#F5F5F5]");
    const searchButtonClasses = classNames(buttonClassesBase, "left-0");
    const closeButtonClasses = classNames(buttonClassesBase, "right-0");

    const handleDebouncedValue = () => {
        if (!debouncedValue || valueIsEmpty) return;

        if (isUserSelected && activeDialogId) {
            dispatch(sendSearchByDialogId({dialogId: activeDialogId, searchQuery: debouncedValue}));
            return;
        }

        dispatch(sendSearch(debouncedValue));
    };

    const clearSearch = (): void => {
        actions.clearSearch();

        setValue("");
        inputRef.current?.focus();
    };

    useEffect(() => {
        handleDebouncedValue();
    }, [debouncedValue, isUserSelected]);

    return (
        <div className="relative">
            <button
                className={searchButtonClasses}
                onClick={handleDebouncedValue}
            >
                <SearchIcon className="h-5 w-5" />
            </button>

            <input
                ref={inputRef}
                type="text"
                placeholder={t("search.title").toString()}
                className="duration-250 w-full rounded-md bg-[#EAEDFA] py-2 px-12 pt-3 outline-none transition-colors dark:border-r-neutral-700 dark:bg-[#10182B]"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />

            {!valueIsEmpty && (
                <button
                    className={closeButtonClasses}
                    onClick={clearSearch}
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            )}
        </div>
    );
}