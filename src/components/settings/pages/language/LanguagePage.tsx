import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/stores/hooks";
import { updateUser } from "@/stores/slices/user/user";
import { RatioButton } from "@/components/ui/messenger/RatioButton";
import { Languages } from "@/entities";

/**
 * Application languages.
 */
export const languages = {
    et: { nativeName: "Eesti" },
    en: { nativeName: "English" },
    ru: { nativeName: "Русский" },
};

/**
 * Language selection page.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const LanguagePage: FC = () => {
    const { i18n } = useTranslation();

    const dispatch = useAppDispatch();

    /**
     * Changes the language.
     *
     * @param {string} language - Language to set.
     */
    const changeLanguage = async (language: string): Promise<void> => {
        await i18n.changeLanguage(language);

        // const lang = Languages[language.toUpperCase() as keyof typeof Languages];
        const lang = Languages[language.toUpperCase() as keyof typeof Languages];
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
