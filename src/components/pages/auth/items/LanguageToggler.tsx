import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {useHover} from "../../../../hooks/useHover";
import {languages} from "../../../settings/pages/language/LanguagePage";

export const LanguageToggler = () => {
	const { i18n } = useTranslation();

	const ref = useRef<HTMLDivElement>(null);
	const isHovered = useHover(ref);

	/**
	 * **NOTE:** We toggle the language LOCALLY.
	 */
	const changeLanguage = async (language: string) => {
		if (language === i18n.resolvedLanguage) return;

		await i18n.changeLanguage(language);
	};

	return (
		<div
			className="duration-250 flex cursor-pointer select-none items-center justify-center rounded bg-white transition-colors dark:bg-[#151F38] dark:text-white"
			ref={ref}
		>
			<motion.div className="flex cursor-pointer items-center justify-center rounded px-4 py-1.5">
				<span>{languages[(i18n.resolvedLanguage as keyof typeof languages) || "et"].nativeName || null}</span>
			</motion.div>

			<AnimatePresence>
				{isHovered && (
					<motion.div
						className="duration-250 absolute top-10 right-0 w-32 rounded bg-white shadow-lg transition-colors dark:bg-[#151F38]"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
					>
						{Object.keys(languages).map((language) => (
							<div
								key={language}
								onClick={() => changeLanguage(language)}
								className={classNames("flex p-2", language === i18n.resolvedLanguage ? "bg-[#CFD0D475] dark:bg-[#2F384E]" : "hover:bg-[#CFD0D450] dark:hover:bg-[#2F384E50]")}
							>
								<span>{languages[language as keyof typeof languages].nativeName}</span>
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
