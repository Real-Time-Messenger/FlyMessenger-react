import { ScrollReader } from "@/components/ui/landing/ScrollReader";
import { useTranslation } from "react-i18next";
import { useStateSelector } from "@/stores/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { infoDark, infoLight } from "../../assets/images";
import { ScrollReaderData } from "@/interfaces/components/ScrollReaderData";
import { useDocumentTitle } from "@/hooks";

/**
 * An array with FAQ questions.
 */
const faq: ScrollReaderData[] = [
    {
        title: "pages.faq.questions.0.title",
        content: "pages.faq.questions.0.content",
    },
    {
        title: "pages.faq.questions.1.title",
        content: "pages.faq.questions.1.content",
    },
];

/**
 * FAQ page of the application.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const FaqPage = () => {
    const { t } = useTranslation();

    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);

    useDocumentTitle(`${t("pages.faq.title")} | FlyMessenger`);

    return (
        <div className="flex flex-col gap-10">
            <div className="grid-cols-0 grid place-items-center justify-around md:grid-cols-2">
                <div className="mt-10 flex grid-cols-2 flex-col gap-5">
                    <span className="text-5xl text-[#161616] transition-colors dark:text-white">
                        {t("pages.faq.title")}
                    </span>
                    <span className="text-xl text-[#303030] transition-colors dark:text-[#C8C8C8]">
                        {t("pages.faq.subtitle")}
                    </span>
                </div>

                <div className="hidden aspect-square h-[320px] md:block">
                    <AnimatePresence>
                        {isDarkMode ? (
                            <motion.img
                                key="puzzleDark"
                                src={infoDark}
                                alt="anonymous"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        ) : (
                            <motion.img
                                key="puzzle"
                                src={infoLight}
                                alt="anonymous"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ScrollReader data={faq} height={300} />
        </div>
    );
};
