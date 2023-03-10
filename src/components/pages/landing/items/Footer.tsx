import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const Footer = () => {
    const {t} = useTranslation()

    return (
        <div
            className="w-full bg-[#F8F9FE] transition-colors dark:bg-[#151F38] min-h-[260px] flex items-center justify-center py-5 mt-[140px] overflow-hidden">
            <div className="container h-full grid items-center lg:grid-cols-[1fr_2fr]">
                <div className="flex flex-col gap-7">
                    <span className="text-4xl text-[#161616] dark:text-white transition-colors">Fly Messenger</span>

                    <span className="text-[#696969] dark:text-[#797D93]">{t("footer.description")}</span>
                </div>

                <div
                    className="grid-cols-3 h-full ml-[60px] pl-[60px] border-l border-l-[#D8D8D8] dark:border-l-[#1F2841] pt-10 select-none transition-colors hidden lg:grid">
                    <div className="flex flex-col gap-7">
                        <span
                            className="text-2xl text-[#161616] dark:text-white transition-colors">{t("footer.sections.about.title")}</span>

                        <div className="flex flex-col gap-2">
                            <Link to="/privacy"
                               className="text-[#696969] transition-colors dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white w-fit">{t("footer.sections.about.privacy")}</Link>
                            <Link to="/terms"
                               className="text-[#696969] transition-colors dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white w-fit">{t("footer.sections.about.terms")}</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <span
                            className="text-2xl text-[#161616] dark:text-white transition-colors">{t("footer.sections.apps.title")}</span>

                        <div className="flex flex-col gap-2">
                            <a download href="/public/FlyMessenger.exe"
                               className="text-[#696969] transition-colors dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white w-fit">{t("footer.sections.apps.windows")}</a>
                            <Link to="/m" target="_blank"
                                  className="text-[#696969] transition-colors dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white w-fit">{t("footer.sections.apps.web")}</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <span
                            className="text-2xl text-[#161616] dark:text-white transition-colors">{t("footer.sections.contact.title")}</span>

                        <div className="flex flex-col gap-2">
                            <a href="https://github.com/Real-Time-Messenger" target="_blank"
                               className="text-[#696969] transition-colors dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white w-fit">{t("footer.sections.contact.github")}</a>
                            <a href="mailto:vladislav.hodzajev@ivkhk.ee"
                               className="text-[#696969] transition-colors dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white w-fit">vladislav.hodzajev@ivkhk.ee</a>
                            <a href="mailto:kirill.goritski@ivkhk.ee"
                               className="text-[#696969] transition-colors dark:text-[#797D93] hover:text-[#161616] dark:hover:text-white w-fit">kirill.goritski@ivkhk.ee</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}