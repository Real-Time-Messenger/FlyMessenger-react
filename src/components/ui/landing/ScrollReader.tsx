import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { motion } from "framer-motion";
import { ScrollReaderData } from "@/interfaces/components/ScrollReaderData";

/**
 * Array of possible font sizes represented as Tailwind CSS classes.
 */
const fontSizes = ["text-lg", "text-base", "text-sm"];

/**
 * Props for the {@link ScrollReader} component.
 *
 * @interface ScrollReaderProps
 *
 * @property {ScrollReaderData[]} data - The data of the tree.
 * @property {boolean} numeration - Whether to display the numeration of the elements.
 * @property {number} height - The height of the content element.
 */
interface ScrollReaderProps {
    data: ScrollReaderData[];
    numeration?: boolean;
    height?: number;
}

/**
 * The component that renders the list tree.
 *
 * The tree is divided into 2 elements: navigation and content. The navigation element serves as an anchor for easy content navigation.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ScrollReader: FC<ScrollReaderProps> = ({ data, height = null, numeration = false }) => {
    const { t } = useTranslation();

    const [activeIndex, setIndex] = useState<string>("1");

    const contentRef = useRef<HTMLDivElement>(null);

    /**
     * Scrolls to the element with the specified index.
     *
     * @param {string | number} index - The index of the element to scroll to.
     */
    const scrollToElement = (index: string): void => {
        if (!contentRef.current) return;

        setIndex(index);

        const element = contentRef.current.querySelector(`[data-target-id="${index}"]`);
        if (!element) return;

        element.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    /**
     * Renders the navigation tree.
     *
     * @param {ScrollReaderData[]} children - The children of the section.
     * @param {number} depth - The depth of the section.
     * @param {string} prefix - The prefix of the section.
     *
     * @returns {JSX.Element | null} - The navigation tree.
     */
    const renderChildrenNavigation = (children?: ScrollReaderData[], depth = 1, prefix = "1"): JSX.Element | null => {
        if (!children) return null;

        return (
            <div className="flex flex-col">
                {children.map((child, index) => (
                    <div data-target-id={`${prefix}.${index + 1}`} key={index} className="flex flex-col">
                        <span
                            onClick={() => scrollToElement(`${prefix}.${index + 1}`)}
                            className={classNames(
                                "mt-2 cursor-pointer leading-6 transition-colors",
                                fontSizes[depth - 1],
                                activeIndex === `${prefix}.${index + 1}`
                                    ? "text-[#161616] dark:text-white"
                                    : "text-[#696969] dark:text-[#4E5772]",
                            )}
                            style={{ marginLeft: depth * 10 }}
                        >
                            {numeration && `${prefix}.${index + 1}`} {t(child.title)}
                        </span>

                        {renderChildrenNavigation(child.children, depth + 1, `${Number(prefix) + 1}`)}
                    </div>
                ))}
            </div>
        );
    };

    /**
     * Renders the content tree.
     *
     * @param {ScrollReaderData[]} children - The children of the section.
     * @param {number} depth - The depth of the section.
     * @param {string} prefix - The prefix of the section.
     *
     * @returns {JSX.Element | null} The content tree.
     */
    const renderChildrenContent = (children?: ScrollReaderData[], depth = 1, prefix = "1"): JSX.Element | null => {
        if (!children) return null;

        return (
            <div className="flex flex-col">
                {children.map((child, index) => (
                    <div
                        key={index}
                        className="relative my-2 flex flex-col gap-2 py-2 transition-all lg:pl-5"
                        data-target-id={`${prefix}.${index + 1}`}
                        style={{ marginLeft: depth * 20 }}
                    >
                        <span className="text-xl leading-6 text-[#161616] transition-colors dark:text-white">
                            {numeration && `${prefix}.${index + 1}`} {t(child.title)}
                        </span>
                        {child.content && (
                            <>
                                {typeof child.content === "string" ? (
                                    <span
                                        className={classNames(
                                            "leading-6 text-[#7B7B7B] transition-colors dark:text-[#797D93]",
                                        )}
                                    >
                                        {t(child.content)}
                                    </span>
                                ) : (
                                    <ul className="list-disc lg:pl-5">
                                        {child.content.map((item, index) => (
                                            <li
                                                key={index}
                                                className={classNames(
                                                    "text-[#7B7B7B] transition-colors dark:text-[#797D93]",
                                                )}
                                            >
                                                {t(item)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}

                        {renderChildrenContent(child.children, depth + 1, `${prefix}.${index + 1}`)}

                        {activeIndex === `${prefix}.${index + 1}` && (
                            <motion.div
                                layoutId="scrollReader"
                                className="absolute top-0 left-0 hidden h-full w-1 rounded-full bg-[#98BDE7] transition-colors dark:bg-[#1F2B49] lg:block"
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    /**
     * Specifies which anchor is in the middle of the screen to make it stand out in the navigation section.
     */
    const getElementInViewport = (): void => {
        if (!contentRef.current) return;

        const elements = contentRef.current.querySelectorAll("[data-target-id]");
        if (!elements.length) return;

        const element = Array.from(elements).find((element) => {
            const rect = element.getBoundingClientRect();
            return rect.top >= 100 && rect.top <= rect.height + 100;
        });
        if (!element) return;

        const index = element.getAttribute("data-target-id");
        if (!index) return;

        setIndex(index);
    };

    /**
     * Adds event listeners to the document.
     */
    useEffect(() => {
        document.addEventListener("wheel", getElementInViewport);
        document.addEventListener("touchmove", getElementInViewport);

        return () => {
            document.removeEventListener("wheel", getElementInViewport);
            document.removeEventListener("touchmove", getElementInViewport);
        };
    }, [activeIndex]);

    return (
        <div className="grid grid-cols-[1fr_1px_3fr] gap-10" style={{ height: height ? `${height}px` : "auto" }}>
            <div className="navigation-content sticky top-[100px] hidden h-fit max-h-[calc(100vh-140px)] overflow-auto pr-5 lg:block">
                <div className="flex flex-col gap-3">
                    {data.map((item, index) => (
                        <div data-target-id={`${index + 1}`} key={index} className="flex flex-col">
                            <span
                                onClick={() => scrollToElement(`${index + 1}`)}
                                className={classNames(
                                    "cursor-pointer text-xl transition-colors",
                                    activeIndex === `${index + 1}`
                                        ? "text-[#161616] dark:text-white"
                                        : "text-[#696969] dark:text-[#4E5772]",
                                )}
                            >
                                {numeration && `${index + 1}.`} {t(item.title)}
                            </span>

                            {renderChildrenNavigation(item.children, 1, String(index + 1))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky top-[100px] hidden max-h-[650px] w-1 border-r-[4px] border-dashed border-[#CBD8F2] transition-colors dark:border-[#1F2B49] lg:block" />

            <div className="col-span-3 flex flex-col gap-5 lg:col-span-1 " ref={contentRef}>
                {data.map((item, index) => (
                    <div
                        key={index}
                        data-target-id={`${index + 1}`}
                        className="relative flex flex-col gap-2 py-2 transition-all lg:pl-10"
                        data-index={index + 1}
                    >
                        <span className="text-xl text-[#161616] transition-colors dark:text-white">
                            {numeration && `${index + 1}.`} {t(item.title)}
                        </span>

                        {item.content && (
                            <>
                                {typeof item.content === "string" ? (
                                    <span className="text-base text-[#7B7B7B] transition-colors dark:text-[#797D93]">
                                        {t(item.content)}
                                    </span>
                                ) : (
                                    <ul className="list-disc pl-5">
                                        {item.content.map((content, index) => (
                                            <li
                                                key={index}
                                                className="text-base text-[#7B7B7B] transition-colors dark:text-[#797D93]"
                                            >
                                                {t(content)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}

                        {renderChildrenContent(item.children, 1, String(index + 1))}

                        {activeIndex === `${index + 1}` && (
                            <motion.div
                                layoutId="scrollReader"
                                className="absolute top-0 left-0 hidden h-full w-1 rounded-full bg-[#98BDE7] transition-colors dark:bg-[#1F2B49] lg:block"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
