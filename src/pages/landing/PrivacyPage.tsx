import {LandingLayout} from "../../components/layout/LandingLayout";
import {useTranslation} from "react-i18next";
import {infoDark, infoLight} from "../../components/layout/items/landing/images";
import {ScrollReader, ScrollReaderData} from "../../components/layout/items/landing/ScrollReader";
import {AnimatePresence, motion} from "framer-motion";
import {useStateSelector} from "../../stores/hooks";
import {useEffect} from "react";
import {setDocumentTitle} from "../../helpers/helpers";

const privacy: ScrollReaderData[] = [
    {
        title: "pages.privacy.policy.0.title",
        content: "pages.privacy.policy.0.content",
        children: [
            {
                title: "pages.privacy.policy.0.children.0.title",
                content: [
                    "pages.privacy.policy.0.children.0.content.0",
                    "pages.privacy.policy.0.children.0.content.1",
                    "pages.privacy.policy.0.children.0.content.2",
                    "pages.privacy.policy.0.children.0.content.3",
                ],
            }
        ],
    },
    {
        title: "pages.privacy.policy.1.title",
        children: [
            {
                title: "pages.privacy.policy.1.children.0.title",
                content: "pages.privacy.policy.1.children.0.content",
            },
            {
                title: "pages.privacy.policy.1.children.1.title",
                content: "pages.privacy.policy.1.children.1.content",
            },
            {
                title: "pages.privacy.policy.1.children.2.title",
                content: "pages.privacy.policy.1.children.2.content",
            },
        ]
    },
    {
        title: "pages.privacy.policy.2.title",
        children: [
            {
                title: "pages.privacy.policy.2.children.0.title",
                content: "pages.privacy.policy.2.children.0.content",
            }
        ]
    },
    {
        title: "pages.privacy.policy.3.title",
        children: [
            {
                title: "pages.privacy.policy.3.children.0.title",
                content: "pages.privacy.policy.3.children.0.content",
            },
            {
                title: "pages.privacy.policy.3.children.1.title",
                content: "pages.privacy.policy.3.children.1.content",
            }
        ]
    },
    {
        title: "pages.privacy.policy.4.title",
        content: "pages.privacy.policy.4.content",
    }
];

export const PrivacyPage = () => {
    const {t} = useTranslation();

    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);

    useEffect(() => {
        setDocumentTitle(`${t("pages.privacy.title")} | FlyMessenger`);
    })

    return (
        <LandingLayout>
            <div className="flex flex-col gap-20">
                <div className="flex justify-around">
                    <div className="flex flex-col gap-5 mt-10 max-w-2xl">
                        <span className="text-5xl transition-colors text-[#161616] dark:text-white">{t("pages.privacy.title")}</span>
                        <span className="text-xl transition-colors text-[#303030] dark:text-[#C8C8C8]">{t("pages.privacy.subtitle")}</span>
                    </div>

                    <div className="aspect-square h-[320px]">
                        <AnimatePresence>
                            {isDarkMode ? (
                                <motion.img
                                    key="puzzleDark"
                                    src={infoDark}
                                    alt="anonymous"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.2}}
                                />
                            ) : (
                                <motion.img
                                    key="puzzle"
                                    src={infoLight}
                                    alt="anonymous"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.2}}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <ScrollReader data={privacy} numeration={true}/>
            </div>
        </LandingLayout>
    )
}