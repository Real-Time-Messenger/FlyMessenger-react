import { LandingLayout } from "../../components/layout/LandingLayout"
import {useTranslation} from "react-i18next";

export const TermsPage = () => {
    const {t} = useTranslation();

    return (
        <LandingLayout>
            <div className="my-20 flex flex-col gap-5">
                <span className="text-5xl mx-auto transition-colors text-[#161616] dark:text-white">{t("pages.terms.title")}</span>

                <div className="flex flex-col gap-7 mt-10 max-w-3xl">
                    <div className="flex flex-col gap-3">
                        <span className="text-3xl text-[#161616] transition-colors dark:text-white">{t("pages.terms.content.agreement.title")}</span>
                        <span className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">{t("pages.terms.content.agreement.content")}</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-3xl text-[#161616] transition-colors dark:text-white">{t("pages.terms.content.uses_it.title")}</span>

                        <ol className="list-decimal pl-5">
                            <li className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">{t("pages.terms.content.uses_it.content.0")}</li>
                            <li className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">{t("pages.terms.content.uses_it.content.1")}</li>
                            <li className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">{t("pages.terms.content.uses_it.content.2")}</li>
                            <li className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">{t("pages.terms.content.uses_it.content.3")}</li>
                            <li className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">{t("pages.terms.content.uses_it.content.4")}</li>
                        </ol>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-3xl text-[#161616] transition-colors dark:text-white">{t("pages.terms.content.fair.title")}</span>

                        <ol className="list-decimal pl-5">
                            <li className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">{t("pages.terms.content.fair.content.0")}</li>
                            <li className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">{t("pages.terms.content.fair.content.1")}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </LandingLayout>
    )
}