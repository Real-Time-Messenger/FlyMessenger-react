import { ScrollReaderData } from "@/interfaces/components/ScrollReaderData";
import { useTranslation } from "react-i18next";
import { useStateSelector } from "@/stores/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { infoDark, infoLight } from "@/assets/images";
import { ScrollReader } from "@/components/ui/landing/ScrollReader";
import { useDocumentTitle } from "@/hooks";

/**
 * An array with privacy policy sections.
 */
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
            },
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
        ],
    },
    {
        title: "pages.privacy.policy.2.title",
        children: [
            {
                title: "pages.privacy.policy.2.children.0.title",
                content: "pages.privacy.policy.2.children.0.content",
            },
        ],
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
            },
        ],
    },
    {
        title: "pages.privacy.policy.4.title",
        content: "pages.privacy.policy.4.content",
    },
];

/**
 * Privacy policy page.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const PrivacyPage = () => {
    const { t } = useTranslation();

    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);

    useDocumentTitle(`${t("pages.privacy.title")} | FlyMessenger`);

    return (
        <div className="flex flex-col gap-20">
            <div className="grid grid-cols-1 place-items-center justify-around md:grid-cols-2">
                <div className="mt-10 flex w-full flex-col gap-5">
                    <span className="text-4xl text-[#161616] transition-colors dark:text-white">
                        {t("pages.privacy.title")}
                    </span>
                    <span className="text-lg text-[#303030] transition-colors dark:text-[#C8C8C8]">
                        {t("pages.privacy.subtitle")}
                    </span>
                </div>

                <div className="hidden aspect-square h-[320px] md:block">
                    <AnimatePresence>
                        {isDarkMode ? (
                            <motion.img
                                key="infoImg"
                                src={infoDark}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        ) : (
                            <motion.img
                                key="infoImg"
                                src={infoLight}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ScrollReader data={privacy} numeration={true} />
        </div>
    );
};
