import {
    anonymous,
    anonymousDark,
    folder,
    folderDark,
    padlock,
    padlockDark,
    picture,
    pictureDark,
    puzzle,
    puzzleDark,
    trash,
    trashDark,
} from "@/assets/images";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "@/hooks";
import { Banner } from "@/components/ui/landing/Banner";
import { Link } from "react-router-dom";
import { DesktopAppIcon, WebAppIcon } from "@/components/icons";
import { AdvantageItem } from "@/components/ui/landing/AdvantageItem";

/**
 * An array with messenger benefits.
 */
const advantages = [
    {
        translationKey: "anonymity",
        lightImage: anonymous,
        darkImage: anonymousDark,
    },
    {
        translationKey: "ease_of_use",
        lightImage: puzzle,
        darkImage: puzzleDark,
    },
    {
        translationKey: "confidentiality",
        lightImage: folder,
        darkImage: folderDark,
    },
    {
        translationKey: "without_a_trace",
        lightImage: trash,
        darkImage: trashDark,
    },
    {
        translationKey: "free_of_charge",
        lightImage: padlock,
        darkImage: padlockDark,
    },
    {
        translationKey: "no_packaging",
        lightImage: picture,
        darkImage: pictureDark,
    },
];

/**
 * Main landing page of the application.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const MainPage = () => {
    const { t } = useTranslation();

    useDocumentTitle("Fly Messenger");

    return (
        <div className="lg:mt-15 mt-10">
            <div className="flex flex-col items-center gap-3">
                <span className="text-center text-4xl md:text-5xl">Fly Messenger</span>
                <span className="text-center text-xl text-[#303030] transition-colors dark:text-white">
                    {t("pages.main.title")}
                </span>
            </div>

            <Banner />

            <div className="mt-16 flex flex-col gap-10">
                <div className="flex flex-col items-center justify-center gap-3">
                    <span className="relative text-3xl">{t("pages.main.apps.title")}</span>

                    <div className="h-1 w-[100px] rounded-full bg-[#CBD8F2] transition-colors dark:bg-[#1F2B49]" />
                </div>

                <div className="grid justify-items-center gap-10 md:grid-cols-2 md:justify-between md:gap-36">
                    <Link
                        to="/m"
                        className="group flex w-full cursor-pointer flex-col items-center gap-8 rounded-lg p-4 text-[#AFAFAF] transition-colors hover:bg-[#F8F9FE] dark:text-[#25355C] dark:hover:bg-[#151F38] md:max-w-[480px]"
                    >
                        <WebAppIcon className="max-h-[200px] max-w-[200px] text-[#5B9BD9] transition-colors dark:text-[#3752A3] lg:max-h-[400px] lg:max-w-[400px]" />

                        <button className="group flex max-w-[220px] items-center gap-3 rounded-lg border border-[#D8D8D8] bg-transparent p-3 text-left transition-colors group-hover:border-[#4C4C4C] dark:border-[#25355C] dark:group-hover:border-[#B8BAF2] dark:group-hover:bg-[#1F2B49]">
                            <WebAppIcon className="h-8 w-8 flex-none transition-colors group-hover:text-[#5B9BD9] dark:group-hover:text-[#B8BAF2]" />

                            <span className="text-xs transition-colors group-hover:text-[#696969] dark:group-hover:text-[#B8BAF2]">
                                {t("pages.main.apps.web.open", {
                                    name: `Fly Messenger Web ${import.meta.env.VITE_APP_VERSION}`,
                                })}
                            </span>
                        </button>
                    </Link>

                    <a
                        href="/public/FlyMessenger.exe"
                        download
                        className="group flex w-full cursor-pointer flex-col items-center gap-8 rounded-lg p-4 text-[#AFAFAF] transition-colors hover:bg-[#F8F9FE] dark:text-[#25355C] dark:hover:bg-[#151F38] md:max-w-[480px]"
                    >
                        <DesktopAppIcon className="max-h-[200px] max-w-[200px] text-[#5B9BD9] transition-colors dark:text-[#3752A3] lg:max-h-[400px] lg:max-w-[400px]" />

                        <button className="group flex max-w-[220px] items-center gap-3 rounded-lg border border-[#D8D8D8] bg-transparent p-3 text-left transition-colors group-hover:border-[#4C4C4C] dark:border-[#25355C] dark:group-hover:border-[#B8BAF2] dark:group-hover:bg-[#1F2B49]">
                            <DesktopAppIcon className="h-8 w-8 flex-none transition-colors group-hover:text-[#5B9BD9] dark:group-hover:text-[#B8BAF2]" />

                            <span className="text-xs transition-colors group-hover:text-[#696969] dark:group-hover:text-[#B8BAF2]">
                                {t("pages.main.apps.desktop.open", {
                                    name: `Fly Messenger Desktop ${import.meta.env.VITE_APP_VERSION}`,
                                })}
                            </span>
                        </button>
                    </a>
                </div>
            </div>

            <div className="mt-16 flex flex-col gap-10">
                <div className="flex flex-col items-center justify-center gap-3">
                    <span className="relative text-3xl">{t("pages.main.functions.title")}</span>

                    <div className="h-1 w-[100px] rounded-full bg-[#CBD8F2] transition-colors dark:bg-[#1F2B49]" />
                </div>

                <div className="grid place-items-center gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                    {advantages.map((advantage) => (
                        <AdvantageItem key={advantage.translationKey} {...advantage} />
                    ))}
                </div>
            </div>
        </div>
    );
};
