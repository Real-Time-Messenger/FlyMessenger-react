import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GithubIcon, MailIcon } from "@/components/icons";
import { FC } from "react";

/**
 * Footer component in landing page layout.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const Footer: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="relative mt-[140px] flex min-h-[260px] w-full items-center justify-center overflow-hidden bg-[#F8F9FE] py-5 px-4 transition-colors dark:bg-[#151F38]">
            <div className="container grid h-full items-center lg:grid-cols-[1fr_2fr]">
                <div className="flex flex-col gap-7">
                    <span className="text-4xl text-[#161616] transition-colors dark:text-white">Fly Messenger</span>

                    <span className="text-[#696969] dark:text-[#797D93]">{t("footer.description")}</span>

                    <div className="flex justify-center gap-5 lg:hidden">
                        <a
                            href="https://github.com/Real-Time-Messenger"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-[#696969] p-2 text-[#696969] transition-colors dark:border-[#797D93] dark:text-[#797D93]"
                        >
                            <GithubIcon className="h-5 w-5 stroke-[1.5]" />
                        </a>

                        <a
                            href="mailto:vladislav.hodzajev@ivkhk.ee"
                            className="rounded-full border border-[#696969] p-2 text-[#696969] transition-colors dark:border-[#797D93] dark:text-[#797D93]"
                        >
                            <MailIcon className="h-5 w-5 stroke-[1.5]" />
                        </a>
                        <a
                            href="mailto:kirill.goritski@ivkhk.ee"
                            className="rounded-full border border-[#696969] p-2 text-[#696969] transition-colors dark:border-[#797D93] dark:text-[#797D93]"
                        >
                            <MailIcon className="h-5 w-5 stroke-[1.5]" />
                        </a>
                    </div>
                </div>

                <div className="ml-[60px] hidden h-full select-none grid-cols-3 border-l border-l-[#D8D8D8] pl-[60px] pt-10 transition-colors dark:border-l-[#1F2841] lg:grid">
                    <div className="flex flex-col gap-7">
                        <span className="text-2xl text-[#161616] transition-colors dark:text-white">
                            {t("footer.sections.about.title")}
                        </span>

                        <div className="flex flex-col gap-2">
                            <Link
                                to="/privacy"
                                className="w-fit text-[#696969] transition-colors hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white"
                            >
                                {t("footer.sections.about.privacy")}
                            </Link>
                            <Link
                                to="/terms"
                                className="w-fit text-[#696969] transition-colors hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white"
                            >
                                {t("footer.sections.about.terms")}
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <span className="text-2xl text-[#161616] transition-colors dark:text-white">
                            {t("footer.sections.apps.title")}
                        </span>

                        <div className="flex flex-col gap-2">
                            <a
                                download
                                href="/public/FlyMessenger.exe"
                                className="w-fit text-[#696969] transition-colors hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white"
                            >
                                {t("footer.sections.apps.windows")}
                            </a>
                            <Link
                                to="/m"
                                target="_blank"
                                className="w-fit text-[#696969] transition-colors hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white"
                            >
                                {t("footer.sections.apps.web")}
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <span className="text-2xl text-[#161616] transition-colors dark:text-white">
                            {t("footer.sections.contact.title")}
                        </span>

                        <div className="flex flex-col gap-2">
                            <a
                                href="https://github.com/Real-Time-Messenger"
                                target="_blank"
                                rel="noreferrer"
                                className="w-fit text-[#696969] transition-colors hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white"
                            >
                                {t("footer.sections.contact.github")}
                            </a>
                            <a
                                href="mailto:vladislav.hodzajev@ivkhk.ee"
                                className="w-fit text-[#696969] transition-colors hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white"
                            >
                                vladislav.hodzajev@ivkhk.ee
                            </a>
                            <a
                                href="mailto:kirill.goritski@ivkhk.ee"
                                className="w-fit text-[#696969] transition-colors hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white"
                            >
                                kirill.goritski@ivkhk.ee
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
