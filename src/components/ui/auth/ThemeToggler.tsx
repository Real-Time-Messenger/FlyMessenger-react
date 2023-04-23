import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { MoonIcon, SunIcon } from "@/components/icons";
import { FC } from "react";

/**
 * Theme toggler component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ThemeToggler: FC = () => {
    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);

    const sidebarStore = useActionCreators(sidebarActions);

    return (
        <div
            className="flex cursor-pointer items-center justify-center rounded bg-white p-2 transition-colors dark:bg-[#151F38] dark:text-white"
            onClick={() => sidebarStore.toggleDarkMode({ state: !isDarkMode })}
        >
            {isDarkMode ? <SunIcon className="h-5 w-5 stroke-[1.5]" /> : <MoonIcon className="h-5 w-5 stroke-[1.5]" />}
        </div>
    );
};
