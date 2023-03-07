import {LandingLayout} from "../../components/layout/LandingLayout";
import {useTranslation} from "react-i18next";
import {infoDark, infoLight, puzzle, puzzleDark} from "../../components/layout/items/landing/images";
import {ScrollReader, ScrollReaderData} from "../../components/layout/items/landing/ScrollReader";
import {useStateSelector} from "../../stores/hooks";
import {AnimatePresence, motion} from "framer-motion";

const faq: ScrollReaderData[] = [
    {
        title: "pages.faq.questions.0.title",
        content: "pages.faq.questions.0.content",
    },
    {
        title: "pages.faq.questions.1.title",
        content: "pages.faq.questions.1.content",
    }
]

export const FaqPage = () => {
    const {t} = useTranslation();

    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode)

    return (
        <LandingLayout>
            <div className="flex flex-col gap-10">
                <div className="flex justify-around">
                    <div className="flex flex-col gap-5 mt-10">
                        <span className="text-5xl transition-colors text-[#161616] dark:text-white">{t("pages.faq.title")}</span>
                        <span className="text-xl transition-colors text-[#303030] dark:text-[#C8C8C8]">{t("pages.faq.subtitle")}</span>
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

                <ScrollReader data={faq} height={300} />
            </div>
        </LandingLayout>
    )
}