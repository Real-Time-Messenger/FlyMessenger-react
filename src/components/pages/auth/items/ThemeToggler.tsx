import {useActionsCreators, useStateSelector} from "../../../../stores/hooks";
import {sidebarActions} from "../../../../stores/slices/ui/sidebar/sidebar";
import { MoonIcon } from "../../../icons/MoonIcon";
import { SunIcon } from "../../../icons/SunIcon";

export const ThemeToggler = () => {
	const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);

	const sidebarStore = useActionsCreators(sidebarActions);

	return (
		<div
			className="duration-250 flex cursor-pointer items-center justify-center rounded bg-white p-2 transition-colors dark:bg-[#151F38] dark:text-white"
			onClick={() => sidebarStore.toggleDarkMode()}
		>
			{isDarkMode ? <SunIcon className="h-5 w-5 stroke-[1.5]" /> : <MoonIcon className="h-5 w-5 stroke-[1.5]" />}
		</div>
	);
};
