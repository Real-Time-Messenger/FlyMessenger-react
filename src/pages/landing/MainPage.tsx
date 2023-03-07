import {useTranslation} from "react-i18next"
import {LandingLayout} from "../../components/layout/LandingLayout"
import {
    anonymous,
    anonymousDark,
    bannerDark,
    bannerLight,
    folder,
    folderDark,
    padlock,
    padlockDark,
    picture,
    pictureDark,
    puzzle,
    puzzleDark,
    trash,
    trashDark
} from "../../components/layout/items/landing/images";

import {
    approval,
    chart,
    comments,
    ellipse1,
    ellipse2,
    ellipse3,
    faq,
    openedFolder,
    polygon2,
    settings,
    support,
    template,
    vector1,
    vector2,
    vector3,
    vector4,
    vector5,
    voicePresentation
} from "../../components/layout/items/landing/icons";
import {useStateSelector} from "../../stores/hooks";
import {AnimatePresence, motion} from "framer-motion";
import {DesktopAppIcon, WebAppIcon} from "../../components/icons";
import {Link} from "react-router-dom";
import {FC, useEffect, useRef, useState} from "react";
import classNames from "classnames";

const arrayOfIcons = [
    vector5,
    vector2,
    vector4,
    vector3,
    vector1,
    faq,
    template,
    support,
    polygon2,
    settings,
    comments,
    chart,
    approval,
    ellipse2,
    ellipse3,
    ellipse1,
    openedFolder,
    voicePresentation
]

const AnimatedImage: FC<{ src: string, className?: string, slug: string }> = ({src, className, slug}) => {
    const [x, setX] = useState<number>(Math.floor(Math.random() * 40) - 20)
    const [y, setY] = useState<number>(Math.floor(Math.random() * 40) - 20)

    const animate = () => {
        setX(x => x > 20 ? x - 2 : x < -20 ? x + 2 : Math.floor(Math.random() * 2) === 0 ? x + 2 : x - 2)
        setY(y => y > 20 ? y - 2 : y < -20 ? y + 2 : Math.floor(Math.random() * 2) === 0 ? y + 2 : y - 2)
    }

    useEffect(() => {
        const interval = setInterval(() => animate(), 1)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.img
            src={src}
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.2}}
            className={classNames("absolute transition-transform duration-[300ms]", `icon-${slug}`, className)}
            style={{x, y}}
            alt={slug}
        />
    )
}

export const MainPage = () => {
    const {t} = useTranslation()

    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);
    const iconsRef = useRef<HTMLDivElement>(null)

    return (
        <LandingLayout>
            <div className="mt-10 lg:mt-15">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-4xl text-center md:text-5xl">Fly Messenger</span>
                    <span
                        className="text-xl text-[#303030] dark:text-white transition-colors text-center">{t("pages.main.title")}</span>
                </div>

                <div className="my-5 mb-10 relative flex items-center justify-center relative"
                     ref={iconsRef}>
                    <div className="max-w-[1190px] lg:my-20 md:mb-30">
                        <AnimatePresence>
                            {isDarkMode ? (
                                <motion.img
                                    key="anonymousDark"
                                    src={bannerDark}
                                    alt="bannerLight"
                                    className="w-full main-image"
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.2}}
                                />
                            ) : (
                                <motion.img
                                    key="anonymous"
                                    src={bannerLight}
                                    alt="bannerLight"
                                    className="w-full main-image"
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.2}}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {arrayOfIcons.map((icon, index) => {
                        const name = icon.split("/").pop()?.split(".")[0]
                        const slug = name?.replace(/\s+/g, "-").toLowerCase()

                        return (<AnimatedImage src={icon} slug={slug!} key={index}/>)
                    })}
                </div>

                <div className="mt-16 flex flex-col gap-10">
                    <div className="flex flex-col gap-3 items-center justify-center">
                        <span className="relative text-3xl">
                            {t("pages.main.apps.title")}
                        </span>

                        <div className="w-[100px] bg-[#CBD8F2] h-1 rounded-full dark:bg-[#1F2B49] transition-colors"/>
                    </div>

                    <div className="grid gap-10 sm:grid-cols-2 md:justify-between">
                        <div className="flex flex-col gap-8 items-center text-[#AFAFAF] dark:text-[#25355C]">
                            <WebAppIcon
                                className="max-w-[200px] max-h-[200px] text-[#5B9BD9] dark:text-[#3752A3] transition-colors lg:max-w-[400px] lg:max-h-[400px]"/>

                            <Link to="/m"
                                  className="p-3 rounded-lg border border-[#D8D8D8] flex gap-3 max-w-[220px] bg-transparent dark:hover:bg-[#1F2B49] items-center group transition-colors hover:border-[#4C4C4C] dark:border-[#25355C] dark:group-hover:border-[#B8BAF2]">
                                <WebAppIcon
                                    className="w-8 h-8 flex-none group-hover:text-[#5B9BD9] transition-colors dark:group-hover:text-[#B8BAF2]"/>

                                <span
                                    className="text-xs group-hover:text-[#696969] transition-colors dark:group-hover:text-[#B8BAF2]">
                                    {t("pages.main.apps.web.open", {name: `Fly Messenger Web ${import.meta.env.VITE_REACT_APP_VERSION}`})}
                                </span>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-8 items-center text-[#AFAFAF] dark:text-[#25355C]">
                            <DesktopAppIcon
                                className="max-w-[200px] max-h-[200px] text-[#5B9BD9] dark:text-[#3752A3] transition-colors lg:max-w-[400px] lg:max-h-[400px]"/>

                            <a href="public/FlyMessenger.exe" download
                               className="p-3 rounded-lg border border-[#D8D8D8] flex gap-3 max-w-[220px] bg-transparent dark:hover:bg-[#1F2B49] items-center group transition-colors hover:border-[#4C4C4C] dark:border-[#25355C] dark:group-hover:border-[#B8BAF2]">
                                <DesktopAppIcon
                                    className="w-8 h-8 flex-none group-hover:text-[#5B9BD9] transition-colors dark:group-hover:text-[#B8BAF2]"/>

                                <span
                                    className="text-xs group-hover:text-[#696969] transition-colors dark:group-hover:text-[#B8BAF2]">
                                    {t("pages.main.apps.desktop.open", {name: `Fly Messenger Desktop ${import.meta.env.VITE_REACT_APP_VERSION}`})}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-10">
                    <div className="flex flex-col gap-3 items-center justify-center">
                        <span className="relative text-3xl">
                            {t("pages.main.functions.title")}
                        </span>

                        <div className="w-[100px] bg-[#CBD8F2] h-1 rounded-full dark:bg-[#1F2B49] transition-colors"/>
                    </div>

                    <div className="grid place-items-center gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                        <div className="flex flex-col gap-3 max-w-[224px] items-center text-center">
                            <div className="w-[120px] h-[120px]">
                                <AnimatePresence>
                                    {isDarkMode ? (
                                        <motion.img
                                            key="anonymousDark"
                                            src={anonymousDark}
                                            alt="anonymousDark"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    ) : (
                                        <motion.img
                                            key="anonymous"
                                            src={anonymous}
                                            alt="anonymous"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl">{t("pages.main.functions.anonymity.title")}</span>
                                <span
                                    className="text-[#7B7B7B] dark:text-[#797D93] transition-colors">{t("pages.main.functions.anonymity.description")}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 max-w-[224px] items-center text-center">
                            <div className="w-[120px] h-[120px]">
                                <AnimatePresence>
                                    {isDarkMode ? (
                                        <motion.img
                                            key="puzzleDark"
                                            src={puzzleDark}
                                            alt="puzzleDark"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    ) : (
                                        <motion.img
                                            key="puzzle"
                                            src={puzzle}
                                            alt="puzzle"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl">{t("pages.main.functions.ease_of_use.title")}</span>
                                <span
                                    className="text-[#7B7B7B] dark:text-[#797D93] transition-colors">{t("pages.main.functions.ease_of_use.description")}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 max-w-[224px] items-center text-center">
                            <div className="w-[120px] h-[120px]">
                                <AnimatePresence>
                                    {isDarkMode ? (
                                        <motion.img
                                            key="folderDark"
                                            src={folderDark}
                                            alt="folderDark"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    ) : (
                                        <motion.img
                                            key="folder"
                                            src={folder}
                                            alt="folder"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl">{t("pages.main.functions.confidentiality.title")}</span>
                                <span
                                    className="text-[#7B7B7B] dark:text-[#797D93] transition-colors">{t("pages.main.functions.confidentiality.description")}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 max-w-[224px] items-center text-center">
                            <div className="w-[120px] h-[120px]">
                                <AnimatePresence>
                                    {isDarkMode ? (
                                        <motion.img
                                            key="trashDark"
                                            src={trashDark}
                                            alt="trashDark"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    ) : (
                                        <motion.img
                                            key="trash"
                                            src={trash}
                                            alt="trash"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl">{t("pages.main.functions.without_a_trace.title")}</span>
                                <span
                                    className="text-[#7B7B7B] dark:text-[#797D93] transition-colors">{t("pages.main.functions.without_a_trace.description")}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 max-w-[224px] items-center text-center">
                            <div className="w-[120px] h-[120px]">
                                <AnimatePresence>
                                    {isDarkMode ? (
                                        <motion.img
                                            key="padlockDark"
                                            src={padlockDark}
                                            alt="padlockDark"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    ) : (
                                        <motion.img
                                            key="padlock"
                                            src={padlock}
                                            alt="padlock"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl">{t("pages.main.functions.free_of_charge.title")}</span>
                                <span
                                    className="text-[#7B7B7B] dark:text-[#797D93] transition-colors">{t("pages.main.functions.free_of_charge.description")}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 max-w-[224px] items-center text-center">
                            <div className="w-[120px] h-[120px]">
                                <AnimatePresence>
                                    {isDarkMode ? (
                                        <motion.img
                                            key="pictureDark"
                                            src={pictureDark}
                                            alt="pictureDark"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    ) : (
                                        <motion.img
                                            key="picture"
                                            src={picture}
                                            alt="picture"
                                            className="w-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2}}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xl">{t("pages.main.functions.no_packaging.title")}</span>
                                <span
                                    className="text-[#7B7B7B] dark:text-[#797D93] transition-colors">{t("pages.main.functions.no_packaging.description")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    )
}