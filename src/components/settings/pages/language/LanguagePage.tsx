import { FC } from "react";
import { useTranslation } from "react-i18next";
import { RatioButton } from "../../../ui/ReatioButton";
import {LanguagesEnum} from "../../../../entities";
import {useAppDispatch} from "../../../../stores/hooks";
import {updateUser} from "../../../../stores/slices/user/user";

export const languages = {
	et: { nativeName: "Eesti" },
	en: { nativeName: "English" },
	ru: { nativeName: "Русский" },
};

export const LanguagePage: FC = () => {
	const { i18n } = useTranslation();

	const dispatch = useAppDispatch();

	/**
	 * Handler for the Language toggle.
	 *
	 * @async
	 *
	 * @param {string} language - Language to set.
	 */
	const changeLanguage = async (language: string): Promise<void> => {
		await i18n.changeLanguage(language);

		// Get toggled language as enum value.
		const lang = LanguagesEnum[language.toUpperCase() as keyof typeof LanguagesEnum];
		// await UserController.update({ language: lang });
		dispatch(updateUser({ language: lang }));
	};

	return (
		<div className="mt-2.5 flex w-full flex-col border-t-4 border-t-[#CFD0D4] pt-2.5 dark:border-t-[#2F384E20]">
			{Object.keys(languages).map((language) => (
				<RatioButton
					className="px-6"
					key={language}
					changed={() => changeLanguage(language)}
					id={language}
					isSelected={language === i18n.resolvedLanguage}
					label={languages[language as keyof typeof languages].nativeName}
					value={language}
				/>
			))}
		</div>
	);
};
