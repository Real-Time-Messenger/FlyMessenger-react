import classNames from "classnames";
import { FC, ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {SettingsItemProps} from "../SettingsWindow";
import {buildBackgroundColors, buildTextColors} from "../../layout/items/messanger/SidebarItem";
import {useActionsCreators} from "../../../stores/hooks";
import {settingsActions} from "../../../stores/slices/ui/settings/settings";

export const SettingsItem: FC<SettingsItemProps> = ({ title, subtitle, Icon, onClick, id = undefined, backgroundColor = "", textColor = "#303030, #B8BAF2", iconColor = "#303030, #E3E3FA", disabled = false }: SettingsItemProps) => {
	const { t } = useTranslation();

	const settingsStore = useActionsCreators(settingsActions);

	const backgroundColors = buildBackgroundColors(backgroundColor);
	const textColors = buildTextColors(textColor);
	const iconColors = buildTextColors(iconColor);

	const iconClasses = classNames("p-1 rounded-lg stroke-[1.5]", backgroundColors, iconColors);
	const textClasses = classNames("flex-1", textColors);

	const handleClick = useCallback(() => {
		if (disabled) return;

		if (onClick) {
			onClick();
			return;
		}

		if (!subtitle && typeof subtitle !== "object" && !onClick && id) {
			settingsStore.setActivePage(id);

			return;
		}

		if (subtitle && typeof subtitle === "object") {
			const onChange = (subtitle as ReactElement).props.onChange;
			onChange && onChange(true);
		}
	}, [disabled, onClick, subtitle, id]);

	return (
		<div
			className={classNames("flex w-full select-none items-center justify-between gap-2.5 bg-transparent px-4 py-1.5", disabled ? "opacity-75 cursor-not-allowed" : "hover:bg-[#CFD0D4] dark:hover:bg-[#2F384E65] cursor-pointer")}
			onClick={handleClick}
		>
			<div className={iconClasses}>
				<Icon className="h-5 w-5" />
			</div>

			<span className={textClasses}>{t(title)}</span>

			{typeof subtitle === "string" ? (
				<span
					className="max-w-[100px] truncate text-sm text-[#7CADE0] dark:text-[#4C70E0]"
					title={subtitle}
				>
					{subtitle}
				</span>
			) : (
				subtitle
			)}
		</div>
	);
};
